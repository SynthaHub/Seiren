/**
 * Site navigation. Route paths are kebab-case and permanent — a URL that
 * changes after launch forfeits the accumulated ranking of every link to it.
 *
 * Editable by the site owner via /admin (content/navigation.json), except the
 * `to` / route-path fields, which the CMS config labels as developer-only.
 */
import data from "../../content/navigation.json";

export type NavItem = {
  label: string;
  to: string;
};

export const primaryNav: ReadonlyArray<NavItem> = data.primaryNav;

export const footerNav: ReadonlyArray<{
  heading: string;
  items: ReadonlyArray<NavItem>;
}> = data.footerNav;

/**
 * International form used for the `tel:` href, so the number dials from
 * outside Kenya. Derived here from `telephone` so the two can never drift —
 * they used to be two separately stored fields, which is exactly the class of
 * bug the README's `alt`/`note` note warns about.
 */
function toE164(localNumber: string | null): string | null {
  if (!localNumber) return null;
  return localNumber.startsWith("0") ? `+254${localNumber.slice(1)}` : localNumber;
}

/**
 * Contact points. Each renders only once it has a value, so an outstanding
 * item tightens the layout rather than showing an empty label.
 *
 * Social URLs are stored CANONICAL — no share tokens, no campaign parameters.
 * See content/navigation.json and the CMS field hints for why.
 *
 * ⚠ `telephone` is exactly as supplied and needs confirming before launch —
 * see the OUTSTANDING note in README.md.
 */
export const contactDetails = {
  ...data.contactDetails,
  telephoneE164: toE164(data.contactDetails.telephone),
};

export const officeAddress = data.officeAddress;
