function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
Vue.createApp({
    data(){
        return {
            playerMaxHealth: 100,
            playerHealth: 100,
            monsterMaxHealth: 100,
            monsterHealth: 100,
            specialAttackCD: 4,
            currentSpecialAttackCD: 0,
            healCD: 4,
            currentHealCD: 0,
        }
    },
    computed: {
        canHeal() {
            return this.currentHealCD <= 0;
        },
        canSpecialAttack() {
          return this.currentSpecialAttackCD <= 0;
        },
        playerHealthPercentage(){
            const result = Math.floor(this.playerHealth * 100 / this.playerMaxHealth);
            return result;
        },
        playerHealthBarStyle(){
            return {
                width: this.playerHealthPercentage + '%'
            }
        },
        monsterHealthPercentage(){
            const result = Math.floor(this.monsterHealth * 100 / this.monsterMaxHealth);
            return result;
        },
        monsterHealthBarStyle(){
            return {
                width: this.monsterHealthPercentage + '%'
            }
        },
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.endRound();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.currentSpecialAttackCD += this.specialAttackCD;
            this.attackPlayer();
            this.endRound();
        },
        endRound(){
            this.currentSpecialAttackCD = this.currentSpecialAttackCD - 1 < 0 ? 0 : this.currentSpecialAttackCD - 1;
            this.currentHealCD = this.currentHealCD - 1 < 0 ? 0 : this.currentHealCD - 1;
        },
        healPlayer(){
            const healValue = getRandomValue(8, 20);
            const resultHealth = this.playerHealth + healValue;
            this.playerHealth = resultHealth > this.playerMaxHealth ? this.playerMaxHealth : resultHealth;
            this.currentHealCD = this.healCD;
            this.attackPlayer();
            this.endRound();
        }
    },
    watch: {
        playerHealth(value){
            if(value < 0){
                this.playerHealth = 0;
            }
        },
        monsterHealth(value){
            if(value < 0){
                this.monsterHealth = 0;
            }
        }
    }
}).mount('#game');