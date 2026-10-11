#!/usr/bin/env python3
"""Liste les projets motion modifiés depuis la dernière récolte du skill.
Usage : python3 outils/recolter.py [--depuis AAAA-MM-JJ] [--sans-maj]
"""
import os, sys, time, datetime

ICI = os.path.dirname(os.path.abspath(__file__))
REPERE = os.path.join(ICI, "derniere-recolte.txt")
# Dossier des projets motion (MOTION_DIR, sinon ~/Documents/Motion) et dossiers à surveiller : prive/racines.txt (un par ligne),
# sinon les dossiers par défaut ci-dessous.
MOTION = os.path.expanduser(os.environ.get("MOTION_DIR", "~/Documents/Motion"))
_RACINES_FICHIER = os.path.join(os.path.dirname(ICI), "prive", "racines.txt")
RACINES = ([l.strip() for l in open(_RACINES_FICHIER, encoding="utf-8") if l.strip() and not l.startswith("#")]
           if os.path.exists(_RACINES_FICHIER) else ["clients", "_formations"])
EXT = {".html", ".mjs", ".js", ".py", ".md", ".json", ".txt", ".swift", ".sh"}
IGNORE = {"node_modules", ".venv", "venv", "stills", "renders", "flow", "neuves", "__pycache__", ".git", "skill-motion-design", "motion-design-skill"}


def depuis():
    if "--depuis" in sys.argv:
        return time.mktime(datetime.date.fromisoformat(sys.argv[sys.argv.index("--depuis") + 1]).timetuple())
    if os.path.exists(REPERE):
        return float(open(REPERE).read().split()[0])
    return time.time() - 7 * 86400


def main():
    t0 = depuis()
    projets = {}
    for r in RACINES:
        base = os.path.join(MOTION, r)
        if not os.path.isdir(base):
            continue
        for p in sorted(os.listdir(base)):
            chemin = os.path.join(base, p)
            if not os.path.isdir(chemin) or p in IGNORE or p.startswith("."):
                continue
            modifs = []
            for d, sous, fichiers in os.walk(chemin):
                sous[:] = [s for s in sous if s not in IGNORE and not s.startswith(".")]
                for f in fichiers:
                    if os.path.splitext(f)[1] in EXT:
                        fp = os.path.join(d, f)
                        try:
                            if os.path.getmtime(fp) > t0:
                                modifs.append(os.path.relpath(fp, chemin))
                        except OSError:
                            pass
            if modifs:
                projets[os.path.relpath(chemin, MOTION)] = modifs
    print("Récolte depuis", datetime.datetime.fromtimestamp(t0).strftime("%Y-%m-%d %H:%M"))
    if not projets:
        print("Rien de nouveau.")
    for p, m in projets.items():
        print(f"\n## {p} ({len(m)} fichiers)")
        for f in sorted(m)[:25]:
            print("  -", f)
        if len(m) > 25:
            print(f"  … et {len(m) - 25} autres")
    if "--sans-maj" not in sys.argv:
        open(REPERE, "w").write(f"{time.time()} {datetime.datetime.now():%Y-%m-%d %H:%M}\n")


if __name__ == "__main__":
    main()
