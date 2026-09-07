import glob, re

files = sorted(glob.glob("*.html"))

print("=== CHECKING CONTAINERS & WIDTHS ===")
for f in files:
    content = open(f, encoding="utf-8").read()
    # check max-width in style attribute
    mw = re.findall(r'style=[\x27\x22][^\x27\x22]*max-width:\s*([^;\"\x27]+)', content)
    if mw:
        print(f"{f}: inline max-widths: {mw}")

print("\n=== CHECKING TEXT ALIGN INLINE ===")
for f in files:
    content = open(f, encoding="utf-8").read()
    ta = re.findall(r'style=[\x27\x22][^\x27\x22]*text-align:\s*([^;\"\x27]+)', content)
    if ta:
        print(f"{f}: inline text-align: {ta}")

print("\n=== CHECKING PADDING INLINE ===")
for f in files:
    content = open(f, encoding="utf-8").read()
    pads = re.findall(r'style=[\x27\x22][^\x27\x22]*padding(-top|-bottom)?:(\s*[^;\"\x27]+)', content)
    if pads:
        print(f"{f}: inline padding: {pads[:5]}")
