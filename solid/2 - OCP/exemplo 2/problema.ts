class DiscountCalculator {
  calculateDiscount(userType: string): number {
    if (userType === "Premium") {
      return 20;
    } else if (userType === "Regular") {
      return 10;
    } else {
      return 0;
    }
  }
}


const discountCalculator = new DiscountCalculator();

const premiumDiscount = discountCalculator.calculateDiscount("Premium");
const regularDiscount = discountCalculator.calculateDiscount("Regular");
const guestDiscount = discountCalculator.calculateDiscount("Guest");

console.log(`Desconto para usuário Premium: ${premiumDiscount}%`);
console.log(`Desconto para usuário Regular: ${regularDiscount}%`);
console.log(`Desconto para usuário convidado (Guest): ${guestDiscount}%`);