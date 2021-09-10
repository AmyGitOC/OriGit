export function priceConvert(cents) {
    var prixRond = cents / 100;
    return (prixRond.toFixed(2) + "€");
}
