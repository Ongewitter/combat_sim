  // character:
  //   name: "Cedric De Mits"
  //   hp: "2"
  //   id: 2
  //   armor: "0"
  //   toHit: "3"
  //   damage: {
  //     amount: "-3",
  //     die: "2"
  //   }
  //   bonusDamage: {
  //     amount: "-2",
  //     die: "2"
  //   }
class DnD {
  private readonly hpMin = 0;
  private readonly hpMax = 99;
  private readonly armorMin = 0;
  private readonly armorMax = 99;

  validateCharacter(_character){
    // Skip validation for now
    return true;

    // let validCharacter = true;
    // const keys = ['name', 'hp', 'id', 'armor', 'toHit', 'damage', 'bonusDamage'];
    // keys.every((key) => {
    //   character.hasOwnAttribute(key);
    // });
    // validateHp(character.hp)
    // validateArmor(character.armor)
  }

  validateHp(hp){
    return hp < this.hpMin || hp > this.hpMax;
  }

  validateArmor(armor){
    return armor < this.armorMin || armor > this.armorMax;
  }
}

export const RULESETS = {
  DnD: DnD,
};
