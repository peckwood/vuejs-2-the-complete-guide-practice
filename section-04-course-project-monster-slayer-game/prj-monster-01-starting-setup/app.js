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
            winner: undefined,
            battleLog: []
        }
    },
    methods: {
        startNewGame() {
            this.winner = null;
            this.monsterHealth = this.monsterMaxHealth;
            this.playerHealth = this.playerMaxHealth;
            this.currentSpecialAttackCD = 0;
            this.battleLog = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        attackMonster(){
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addAttackLog('player', 'normal attack', 'monster', attackValue, this.monsterHealth);
            this.attackPlayer();
            this.endRound();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addAttackLog('monster', 'normal attack', 'player', attackValue, this.playerHealth);
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.currentSpecialAttackCD += this.specialAttackCD;
            this.addAttackLog('player', 'special attack', 'monster', attackValue, this.monsterHealth);
            this.attackPlayer();
            this.endRound();
        },
        addAttackLog(attacker, attackType, victim, damage, remainingHealth){
            const log = attacker + ' ' + attackType + ' ' + victim + ' for ' + damage + ' damage, ' + victim + ' now has ' + remainingHealth + ' health';
            this.battleLog.unshift(log);
        },
        endRound(){
            this.currentSpecialAttackCD = this.currentSpecialAttackCD - 1 < 0 ? 0 : this.currentSpecialAttackCD - 1;
            this.battleLog.unshift('---------------------------------------------------------------------------');
        },
        healPlayer(){
            const healValue = getRandomValue(8, 20);
            const resultHealth = this.playerHealth + healValue;
            this.playerHealth = resultHealth > this.playerMaxHealth ? this.playerMaxHealth : resultHealth;
            const log = 'player heals himself for ' + healValue + ', player now has ' + this.playerHealth + ' health';
            this.battleLog.unshift(log);
            this.attackPlayer();
            this.endRound();
        }
    },
    computed: {
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
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'monster';
            }
            if(value<0){
                this.playerHealth = 0;
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'player';
            }
            if(value<0){
                this.monsterHealth = 0;
            }
        }
    }
}).mount('#game');