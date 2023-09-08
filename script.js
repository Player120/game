const player1 = ['', 100, 5]
const player2 = ['', 200, 3]
const boss = [500, 7]
let boss_target = 0
let current_player = 0
let player1_deathmsg = 0
let player2_deathmsg = 0
let PSIchoice_p1 = 0
let PSIchoice_p2 = 0
let enough_pp = 0
frozen = 0 
burn = 0    
crying = 0
cryingHealmsg = 0  
miss = 0
paralysis = 0
confusion = 0
confusionHit = 0
thunderStrike = 0
maxthunderStrike = 0
thunderHit = 0
max_groundHits = 0
groundHits = 0
trip = 0

let player1move;
let player2move;
const max_player1hp = player1[1]
const max_player2hp = player2[1]  

function burncheck() {
    if (burn == 1) {
        damage = Math.round(Math.random()*12+2)
        alert("Boss is burned and took " + damage + " HP of damage!")
        boss[0] = boss[0] - damage
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert("Boss has " + boss[0] + " HP remaining!")
        burnheal = Math.round(Math.random()*9)
        if (burnheal < 3) {
            burn = 0
            alert("Boss's burning has stopped!")
        }
    }
}

function cryingcheck() {
    if (crying == 1) {
        miss = Math.round(Math.random()*99)
        if (miss < 39) {
            damage = 0
            miss = 1200
        }
        cryingHeal = Math.round(Math.random()*9)
        if (cryingHeal < 2) {
            crying = 0
            cryingHealmsg = 1
        }
    }
}

function cry_heal_msg_for_all_boss_actions() {
    if (player1[1] > 0 && cryingHealmsg == 1) {
        alert("Boss stopped crying!")
        cryingHealmsg = 0
    }
    miss = 0
}

function paralyseHeal() {
    paralyseHealchance = Math.round(Math.random()*10) 
    if (paralyseHealchance < 2) {
        paralysis = 0
        rngMsg = Math.round(Math.random()*1) 
        if (rngMsg == 1) {
            alert("Boss's numbness is gone!")
        } else {
            alert("Boss's body could move again freely!")
        }
    }
}

function confusionHeal() {
    confusionHealchance = Math.round(Math.random()*10) 
    if (confusionHealchance < 2) {
        confusion = 0
        confusionHit = 0
        rngMsg = Math.round(Math.random()*1) 
        if (rngMsg == 1) {
            alert("Boss's is mentally confused no more!")
        } else {
            alert("Boss went back to normal!")
        }
    }
}

function trip_getUp() {
    trip_get_upChance = Math.round(Math.random()*1) 
    if (trip_get_upChance == 1) {
        trip = 0
        rngMsg = Math.round(Math.random()*1) 
        if (rngMsg == 1) {
            alert("Boss finally got back up!")
        } else {
            alert("Boss finally got motivation and got back up!")
        }
    }
}

function bossdamage() { /* Boss normal attack */
    if (paralysis == 0) {
        do {
            damage = Math.round(Math.random()*32+2)
        } while (damage < 13)    
        crit = Math.round(Math.random()*4)
        if (crit == 4) {
        damage = damage * 3 + Math.round(Math.random()*12)
        critMsg = "A critical hit!"
        } else {
            critMsg = ""
        }
        /* Test for crying */
            cryingcheck()
        /* Test for crying */
        if (confusionHit == 0) {
            alert("Boss is atacking!")
            /* Test for who boss will target */
                do {
                    boss_target = Math.round(Math.random()*2)
                } while (boss_target < 1)
                if (boss_target == 1 && player1[1] <= 0) {
                    boss_target = 2
                }
                if (boss_target == 2 && player2[1] <= 0) {
                    boss_target = 1
                }
            /* Test for who boss will target */
            /* If boss targets player 1 */
                if (boss_target == 1) {
                    player1[1] = player1[1] - damage
                    if (miss < 100) {
                        alert(critMsg + " " + damage + ' HP of damage to ' + player1[0] + '!')
                    } else {
                        alert("Boss missed the attack!")
                    }
                    if (player1[1] <= 0) {
                        player1[1] = 0
                    }
                    if (miss < 100) {
                        alert(player1[0] + " has " + player1[1] + " HP remaining!")
                    }
                } 
            /* If boss targets player 1 */
            /* If boss targets player 2 */
                if (boss_target == 2) {
                    player2[1] = player2[1] - damage
                    if (miss < 100) {
                        alert(critMsg + " " + damage + ' HP of damage to ' + player2[0] + '!')
                    } else {
                        alert("Boss missed the attack!")
                    }
                    if (player2[1] <= 0) {
                        player2[1] = 0
                    }
                    if (miss < 100) {
                        alert(player2[0] + " has " + player2[1] + " HP remaining!")
                    }
                    if (player2[1] <= 0) {
                        player2_deathmsg = 1
                    } 
                    if (player2_deathmsg == 1) {
                        alert(player2[0] + " got hurt and colapsed...")
                        player2_deathmsg = 2
                    }                    
                }
            /* If boss targets player 2 */
            /* Test for burns */
                if (player1[1] > 0 && player2[1] > 0) {
                    burncheck()
                } 
            /* Test for burns */

            /* Stop crying */
                if (player1[1] > 0 && player2[1] > 0) {
                    cry_heal_msg_for_all_boss_actions()
                }
            /* Stop crying */
        } else {
            boss[0] = boss[0] - damage
            alert("Boss is atacking!")
            if (miss < 100) {
                alert(critMsg + " " + damage + ' HP of damage to Boss!')
            } else {
                alert("Boss missed the attack!")
            }
            if (boss[0] <= 0) {
                boss[0] = 0
            }
            if (miss < 100) {
                alert("Boss has " + boss[0] + " HP remaining!")
            }
            /* Test for burns */
            if (boss[0] > 0) {
                burncheck()
            } 
            /* Test for burns */

            /* Stop crying */
                if (boss[0] > 0) {
                    cry_heal_msg_for_all_boss_actions()
                }
            /* Stop crying */
        }

    } else {
        alert("Boss's body is numb and it can't move!")
        if (paralysis == 1 && boss[0] > 0) {
            paralyseHeal()
        }
        if (confusion == 1 && boss[0] > 0) {
            confusionHeal()
        }
    }
    if (paralysis == 1 && boss[0] > 0) {
        paralyseHeal()
    }
    if (confusion == 1 && boss[0] > 0) {
        confusionHeal()
    }
    turn()                                       
}

function bossHeal() { /* Boss healing */
    alert("Boss is healing!")
        healvalue = Math.round(Math.random()*25+3)
        if (confusionHit == 0) {
            boss[0] = boss[0] + healvalue
            alert("Boss healed " + healvalue + " HP!")
            alert("Boss now has " + boss[0] + " HP!")
            if (player1[1] > 0 && player2[1] > 0) {
                burncheck()
            }
            /* Test for crying */
                cryingcheck()
                cry_heal_msg_for_all_boss_actions()
            /* Test for crying */
        } else {
            do {
                who_will_heal = Math.round(Math.random()*2)
            } while (who_will_heal < 1)
            /* Player 1 or Player 2 */
                if (who_will_heal == 1) {
                    player1[1] = player1[1] + healvalue
                    if (player1[1] > max_player1hp) {
                        player1[1] = max_player1hp
                    }
                    alert(player1[0] + " healed " + healvalue + " HP!")
                    alert(player1[0] + " now has " + player1[1] + " HP!")
                }
                if (who_will_heal == 2) {
                    player2[1] = player2[1] + healvalue
                    if (player2[1] > max_player2hp) {
                        player2[1] = max_player2hp
                    }
                    alert(player2[0] + " healed " + healvalue + " HP!")
                    alert(player2[0] + " now has " + player2[1] + " HP!")
                }                          
            /* Player 1 or Player 2 */
            if (boss[0] > 0) {
                burncheck()
            }
            /* Test for crying */
                cryingcheck()
                cry_heal_msg_for_all_boss_actions()
            /* Test for crying */
            }
    if (paralysis == 1 && boss[0] > 0) {
        paralyseHeal()
    }
    if (confusion == 1 && boss[0] > 0) {
        confusionHeal()
    }
    turn()
}

function bossAction() { /* What will boss do */
    if (frozen == 0 && trip == 0) {
        if (confusion == 1) {
            confusionHit = Math.round(Math.random()*1)
            rngMsg = Math.round(Math.random()*1)
            if (rngMsg == 1) {
                alert ("Boss is so confused!")
            } else {
                alert("Boss is acting a bit unusual...")
            }
        }
        if (boss[0] < 30) { /* Boss healing test */
            bossChance = Math.round(Math.random()*1)
            if (bossChance == 1) {
                bossHeal()
            } else { /* Boss normal attack or PSI test */
                bossChance = Math.round(Math.random()*99)
                if (bossChance > 59) {
                    bossPSI()
                } else {
                    bossdamage()
                }
            }
        } else { /* Boss normal attack or PSI test */
            bossChance = Math.round(Math.random()*99)
            if (bossChance > 64) {
                bossPSI()
            } else {
                bossdamage()
            }  
        }
    } else {
        /* If frozen */
            if (frozen == 1) {
                alert("Boss is frozen and can't move!")
                frozen = 0
            }
        /* If frozen */
        /* If tripped */
            if (trip == 1) {
                rngMsg = Math.round(Math.random()*1)
                if (rngMsg == 1) {
                    alert("Boss is laying on the ground!")
                } else {
                    alert("Boss fell and can't get up!")
                }
                trip_getUp()
            }
        /* If tripped*/
        if (player1[1] > 0 && player2[1] > 0) {
            burncheck()
        }
        /* Stop crying */
            cryingcheck()
            cry_heal_msg_for_all_boss_actions()
        /* Stop crying */
        turn()
    }
}

function bossPSI() { /* Boss PSI */
    if (boss[1] > 0) {    
        do {
            damage = Math.round(Math.random()*35 + Math.round(Math.random()*10+1))
        } while (damage < 20)
        alert('Boss used PSI!')                    
        if (confusionHit == 0) {
            /* Test for who boss will target */
                do {
                    boss_target = Math.round(Math.random()*2)
                } while (boss_target < 1)
                if (boss_target == 1 && player1[1] <= 0) {
                    boss_target = 2
                }
                if (boss_target == 2 && player2[1] <= 0) {
                    boss_target = 1
                }
            /* Test for who boss will target */
            /* If player 1 gets targeted */
                if (boss_target == 1) {
                    alert(damage + ' HP of damage to ' + player1[0] + '!')
                    player1[1] = player1[1] - damage
                    if (player1[1] < 0) {
                        player1[1] = 0
                    }
                    alert(player1[0] + ' now has ' + player1[1] + ' HP remaining!')
                    if (player1[1] > 0 && player2[1] > 0) {
                        burncheck()
                    }                        
                    /* Stop crying */
                    if (player1[1] > 0 && player2[1] > 0) {
                        cryingcheck()
                        cry_heal_msg_for_all_boss_actions()
                    }
                }
            /* If player 1 gets targeted */
            /* If player 2 gets targeted */
                if (boss_target == 2) {
                        alert(damage + ' HP of damage to ' + player2[0] + '!')
                        player2[1] = player2[1] - damage
                        if (player2[1] < 0) {
                            player2[1] = 0
                        }
                        alert(player2[0] + ' now has ' + player2[1] + ' HP remaining!')
                        if (player1[1] > 0 && player2[1] > 0) {
                            burncheck()
                        }                        
                        /* Stop crying */
                        if (player1[1] > 0 && player2[1] > 0) {
                            cryingcheck()
                            cry_heal_msg_for_all_boss_actions()
                        }
                }
            /* If player 2 gets targeted */
            /* Stop crying */  
        } else {
            alert(damage + ' HP of damage to Boss!')
            boss[0] = boss[0] - damage
            if (boss[0] < 0) {
                boss[0] = 0
            }
            alert('Boss has ' + boss[0] + ' HP remaining!')   
            if (boss[0] > 0) {
                burncheck()
            }   
            /* Stop crying */
            if (boss[0] > 0) {
                cryingcheck()
                cry_heal_msg_for_all_boss_actions()
            }
            /* Stop crying */                 
        }
        boss[1] = boss[1] - 1
        if (paralysis == 1 && boss[0] > 0) {
            paralyseHeal()
        }
        if (confusion == 1 && boss[0] > 0) {
            confusionHeal()
        }
        turn()  
    } else {
        bossAction()
    } 
}

function player1Action() { /* Player 1 turn */
    current_player = 1
    player1move = parseInt (prompt(
                player1[0] + '\n' +
                'What will you do?'+'\n'+
                '(1) Attack' + "\n" +
                '(2) Heal' + '\n' +
                '(3) PSI' + '\n' +
                '(4) EXIT' + '\n' +
                "HP - " + player1[1] + " | PP - " + player1[2]
            ))
            console.log(`Player 1 ação: ${player1move}`)
            if (Number(player1move) !== 4) {
                if (player1move >= 1 && player1move <= 3) {
                    if (player1move == 3) {
                        PSImenu()
                    }
                } else {
                    alert('No!')
                    player1Action()
                }
            }
        }
        
        function player2Action() { /* Player 2 turn */
        current_player = 2
        player2move = parseInt (prompt(
                player2[0] + '\n' +
                'What will you do?'+'\n'+
                '(1) Attack' + "\n" +
                '(2) Heal' + '\n' +
                '(3) PSI' + '\n' +
                '(4) EXIT' + '\n' +
                "HP - " + player2[1] + " | PP - " + player2[2]
            ))
            console.log(`Player 2 ação: ${player2move}`)
            if (Number(player2move) !== 4) {
                if (player2move >= 1 && player2move <= 3) {
                    if (player2move == 3) {
                        PSImenu()
                    }
                } else {
                    alert('No!')
                    player2Action()
                }
            }
        }

function playerAttack() { /* Player normal attack */
    /* If player 1 attacks */
        if (current_player == 1) {
            do {
                damage = Math.round(Math.random()*34+3)
            } while (damage < 12)
            crit = Math.round(Math.random()*4)
            if (crit == 4) {
                damage = damage * 3 + Math.round(Math.random()*12)
                critMsg = "A critical hit!"
            } else {
                critMsg = ""
            }
            alert(player1[0] + " is attacking!")
            boss[0] = boss[0] - damage
            alert(critMsg + " " + damage + ' HP of damage to Boss!')
            if (boss[0] <= 0) {
                boss[0] = 0
            }
            alert("Boss has " + boss[0] + " HP remaining!")
        }
    /* If player 1 attacks */
    /* If player 2 attacks */
    if (current_player == 2) {
            do {
                damage = Math.round(Math.random()*34+3)
            } while (damage < 12)
            crit = Math.round(Math.random()*4)
            if (crit == 4) {
                damage = damage * 3 + Math.round(Math.random()*12)
                critMsg = "A critical hit!"
            } else {
                critMsg = ""
            }
            alert(player2[0] + " is attacking!")
            boss[0] = boss[0] - damage
            alert(critMsg + " " + damage + ' HP of damage to Boss!')
            if (boss[0] <= 0) {
                boss[0] = 0
            }
            alert("Boss has " + boss[0] + " HP remaining!")
        }
    /* If player 2 attacks */
}

function playerHeal() { /* Player heal */
    /* If player 1 heals */
        if (current_player == 1) {
            healvalue = Math.round(Math.random()*25+7)
            player1[1] = player1[1] + healvalue
            if (player1[1] > max_player1hp) {
                player1[1] = max_player1hp
            }
            alert(player1[0] + " is healing!")
            alert(player1[0] + " healed " + healvalue + " HP!")
            alert(player1[0] + " now has " + player1[1] + " HP!")
        }
    /* If player 1 heals */
    /* If player 2 heals */
    if (current_player == 2) {
            healvalue = Math.round(Math.random()*25+7)
            player2[1] = player2[1] + healvalue
            if (player2[1] > max_player2hp) {
                player2[1] = max_player2hp
            }
            alert(player2[0] + " is healing!")
            alert(player2[0] + " healed " + healvalue + " HP!")
            alert(player2[0] + " now has " + player2[1] + " HP!")
        }
    /* If player 2 heals */
}

function PKfreeze() { /* Player PSI */
    /* Enough pp test*/
        /* Player 1 */
            if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {    
        do {
            damage = Math.round(Math.random()*72 + Math.round(Math.random()*2))
        } while (damage < 15)
        /* If player 1 */
            if (current_player == 1) {
                alert(player1[0] + ' tried PK Freeze!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Freeze!')
            }
        /* If player 2*/
        alert(damage + ' HP of damage to Boss!')
        /* Freeze test start */
            let freezeTest = Math.round(Math.random()*1)
            if (freezeTest == 1) {
                frozen = 1
                alert("Boss was frozen solid!")
            }
        /* Freeze test end */
        boss[0] = boss[0] - damage
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert('Boss has ' + boss[0] + ' HP remaining!')  

        /* If player 1 */
            if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */
        } else {
            alert('Not enough PP!')
            PSImenu()
        }                
}

function PKfire() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {    
        do {
            damage = Math.round(Math.random()*50 + Math.round(Math.random()*3))
        } while (damage < 35)
        /* If player 1 */
            if (current_player == 1) {
                    alert(player1[0] + ' tried PK Fire!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Fire!')
            }
        /* If player 2*/
        alert(damage + ' HP of damage to Boss!')
        /* Burn test start */
            let burnTest = Math.round(Math.random()*1)
            if (burnTest == 1) {
                burn = 1
                alert('Boss suffered a severe burn!')
            }
        /* Burn test end */
        boss[0] = boss[0] - damage
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert('Boss has ' + boss[0] + ' HP remaining!')  

        /* If player 1 */
            if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */  
        } else {
            alert('Not enough PP!')
            PSImenu()
        }
}

function PKflash() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
            if (current_player == 1) {
                    alert(player1[0] + ' tried PK Flash!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Flash!')
            }
        /* If player 2*/
        ohkoChance = Math.round(Math.random()*99)
        if (ohkoChance > 90) {
            boss[0] = 0
            alert("Boss was desintegrated from existence!")

        } else if (ohkoChance > 75) {
            parORcon = Math.round(Math.random()*1)
            if (parORcon == 1) {
                paralysis = 1
                rngMsg = Math.round(Math.random()*1)
                if (rngMsg == 1) {
                    alert("Boss was paralyzed!")
                } else {
                    alert("Boss's body became numb!")
                }

            } else {
                confusion = 1
                rngMsg = Math.round(Math.random()*1)
                if (rngMsg == 1) {
                    alert("Boss started feeling a little confused...")
                } else {
                    alert("Boss felt a little strange...")
                }
                
            }
            
        } else if (ohkoChance > 55) {
            crying = 1
            rngMsg = Math.round(Math.random()*1)
            if (rngMsg == 1) {
                alert("Boss could not stop crying!")
            } else {
                alert("Boss started crying uncontrollably!")
            }

        } else {
            alert("It had no effect on Boss!")
        }
        /* If player 1 */
           if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert('Not enough PP!')
        PSImenu()
    }
}

function PKthunder() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
            if (current_player == 1) {
                    alert(player1[0] + ' tried PK Thunder!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Thunder!')
            }
        /* If player 2*/
        maxthunderStrike = Math.round(Math.random()*7+1)
        do {
            if (boss[0] > 0) {
                do {
                    damage = Math.round(Math.random()*35 + Math.random()*2)
                } while (damage < 15)
                thunderHit = Math.round(Math.random()*9)
                if (thunderHit < 5) {
                    boss[0] = boss[0] - damage
                    alert(damage + " HP of damage to Boss!")
                    if (boss[0] < 0) {
                        boss[0] = 0
                    }
                    alert("Boss has " + boss[0] + " HP remaining!")
                    /* Paralysis chance */
                        if (boss[0] > 0) {
                            parChance = Math.round(Math.random()*9)
                            if (parChance < 2 && paralysis == 0) {
                                paralysis = 1
                                rngMsg = Math.round(Math.random()*1)
                                if (rngMsg == 1) {
                                    alert("Boss was paralyzed!")
                                } else {
                                    alert("Boss's body became numb!")
                                }   
                            }
                        }
                    /* Paralysis chance */ 
                } else {
                    alert("It didn't hit anyone!")
                }
            }
            ++thunderStrike
        } while (thunderStrike < maxthunderStrike)
        thunderStrike = 0
        /* If player 1 */
        if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert("Not enough PP!")
        PSImenu()
    }
}

function PKstarstorm() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
        if (current_player == 1) {
                alert(player1[0] + ' tried PK Starstorm!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Starstorm!')
            }
        /* If player 2*/
        do {
            damage = Math.round(Math.random()*165 + Math.random()*3)
        } while (damage < 130)
        boss[0] = boss[0] - damage
        alert("Boss suffered a major " + damage + " HP of damage!")
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert("Boss has " + boss[0] + " HP remaining!")
        /* If player 1 */
        if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert("Not enough PP!")
        PSImenu()
    }
}

function PKrockin() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
        if (current_player == 1) {
                    alert(player1[0] + ' tried PK Rockin!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Rockin!')
            }
        /* If player 2*/
        do {
            damage = Math.round(Math.random()*220 + Math.random()*6)
        } while (damage < 100)
        boss[0] = boss[0] - damage
        alert("Boss suffered a hyper major " + damage + " HP of damage!")
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert("Boss has " + boss[0] + " HP remaining!")
        /* If player 1 */
        if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert("Not enough PP!")
        PSImenu()
    }
}

function PKbeam() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
            if (current_player == 1) {
                    alert(player1[0] + ' tried PK Beam!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Beam!')
            }
        /* If player 2*/
        damage = 70
        boss[0] = boss[0] - damage
        alert("Boss suffered " + damage + " HP of damage!")
        if (boss[0] < 0) {
            boss[0] = 0
        }
        alert("Boss has " + boss[0] + " HP remaining!")
        /* If player 1 */
        if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert("Not enough PP!")
        PSImenu()
    }               
}

function PKground() {
    /* Enough pp test*/
        /* Player 1 */
        if (current_player == 1) {
                if (player1[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 1 */
        /* Player 2 */
            if (current_player == 2) {
                if (player2[2] > 0) {
                    enough_pp = 1
                } else {
                    enough_pp = 0
                }
            }
        /* Player 2 */
    /* Enough pp test*/
    if (enough_pp == 1) {
        /* If player 1 */
        if (current_player == 1) {
                    alert(player1[0] + ' tried PK Ground!')
            }
        /* If player 1 */
        /* If player 2 */
            if (current_player == 2) {
                alert(player2[0] + ' tried PK Ground!')
            }
        /* If player 2*/
        max_groundHits = Math.round(Math.random()*7+1)
        do {
            if (boss[0] > 0) {
                do {
                    damage = Math.round(Math.random()*17 + boss[0] * 0.1)
                } while (damage < 10)

                boss[0] = boss[0] - damage
                alert("Boss suffered " + damage + " HP of damage!")
                if (boss[0] < 0) {
                    boss[0] = 0
                }
                alert("Boss has " + boss[0] + " HP remaining!")
                /* Tripping chance */
                    if (boss[0] > 0 && trip == 0) {
                        parChance = Math.round(Math.random()*9)
                            if (parChance < 2 && trip == 0) {
                                trip = 1
                                rngMsg = Math.round(Math.random()*1)
                            if (rngMsg == 1) {
                                alert("Boss tripped and hit the ground imobile!")
                            } else {
                                alert("Boss fell to the ground!")
                            }   
                        }
                    }
                /* Tripping chance */ 

            }
            ++groundHits
        } while (groundHits < max_groundHits)
        groundHits = 0
        /* If player 1 */
        if (current_player == 1) {
                player1[2]--
            }
        /* If player 1 */  
        /* If player 2 */
            if (current_player == 2) {
                player2[2]--
            }
        /* If player 2 */ 
    } else {
        alert("Not enough PP!")
        PSImenu()
    }
}

function PSImenu() { /* Where PSI will be chosen */
    if (current_player == 1) {
        PSIchoice_p1 = prompt (
            "(1) PK Fire" + '\n' +
            "(2) PK Freeze" + '\n' +
            "(3) PK Thunder" + '\n' +
            "(4) PK Flash" + '\n' +
            "(5) PK Starstorm" + '\n' +
            "(6) PK Rockin" + '\n' +
            "(7) PK Beam" + '\n' +
            "(8) PK Ground" + '\n' +
            "(9) Go back"
        )
    }

    if (PSIchoice_p1 == 9) {
        player1Action()
    }

    if (current_player == 2) {
        PSIchoice_p2 = prompt (
            "(1) PK Fire" + '\n' +
            "(2) PK Freeze" + '\n' +
            "(3) PK Thunder" + '\n' +
            "(4) PK Flash" + '\n' +
            "(5) PK Starstorm" + '\n' +
            "(6) PK Rockin" + '\n' +
            "(7) PK Beam" + '\n' +
            "(8) PK Ground" + '\n' +
            "(9) Go back"
        )                  
    }

    if (PSIchoice_p2 == 9) {
        player2Action()
    }
}

function PSIexecution() {
    if (current_player == 1) {
        if (PSIchoice_p1 == 1) {
            PKfire()
        } else if (PSIchoice_p1 == 2) {
            PKfreeze()
        } else if (PSIchoice_p1 == 4) {
            PKflash()
        } else if (PSIchoice_p1 == 3) {
            PKthunder()
        } else if (PSIchoice_p1 == 5) {
            PKstarstorm()
        } else if (PSIchoice_p1 == 6) {
            PKrockin()
        } else if (PSIchoice_p1 == 7) {
            PKbeam()
        } else if (PSIchoice_p1 == 8){
            PKground()
        } else if (PSIchoice_p1 == 9) {
            /* Player 1 */
                player1Action()
            /* Player 1 */
        } else {
            alert("No!")
            PSImenu()
        }
    }   
    if (current_player == 2) {
        if (PSIchoice_p2 == 1) {
            PKfire()
        } else if (PSIchoice_p2 == 2) {
            PKfreeze()
        } else if (PSIchoice_p2 == 4) {
            PKflash()
        } else if (PSIchoice_p2 == 3) {
            PKthunder()
        } else if (PSIchoice_p2 == 5) {
            PKstarstorm()
        } else if (PSIchoice_p2 == 6) {
            PKrockin()
        } else if (PSIchoice_p2 == 7) {
            PKbeam()
        } else if (PSIchoice_p2 == 8){
            PKground()
        } else if (PSIchoice_p2 == 9) {
            /* Player 1 */
                player1Action()
            /* Player 1 */
        } else {
            alert("No!")
            PSImenu()
        }
    }            
}

function move_choice() {
    if (current_player == 1) {
        if (player1move == 1) { /* Normal player attack */
            playerAttack()
        } else if (player1move == 2) { /* Player healing */
            playerHeal()
        } else if (player1move == 3) { /* Player PSI */
            PSImenu()
        } else {
            alert('No!')
            player1Action()
        }           
    }
    if (current_player == 2) {
        if (player2move == 1) { /* Normal player attack */
            playerAttack()
        } else if (player2move == 2) { /* Player healing */
            playerHeal()
        } else if (player2move == 3) { /* Player PSI */
            PSImenu()
        } else {
            alert('No!')
            player2Action()
        }     
    }
}

function turn() {  
    renameTag("Emerson")     
    if ((player1[1] > 0 || player2[1] > 0) && boss[0] > 0) {
            /* Player 1 move choice */
                if (player1[1] > 0) {
                    if (player1move !== 4) {
                        player1Action()
                    }
                } else if (player1_deathmsg == 0) {
                    player1_deathmsg = 1
                }
                if (player1_deathmsg == 1) {
                    alert(player1[0] + " got hurt and colapsed...")
                    player1_deathmsg = 2
                }
            /* Player 2 move choice */
                if (player2[1] > 0 && boss[0] > 0) {
                    if (player2move !== 4) {
                        player2Action()
                    }
                } else if (player2_deathmsg == 0 && player2[1] <= 0) {
                    player2_deathmsg = 1
                }
                if (player2_deathmsg == 1) {
                    alert(player2[0] + " got hurt and colapsed...")
                    player2_deathmsg = 2
                }   
            /* Move execution */
            current_player = 1
            if ((player1move == 1 || player1move == 2) && player1[1] > 0 && boss[0] > 0)  {
                move_choice()
            } else if (player1[1] > 0 && boss[0] > 0 && player1move !== 4) {
                PSIexecution()
            }
            current_player = 2
            if ((player2move == 1 || player2move == 2) && player2[1] > 0 && boss[0] > 0) {
                move_choice()                 
            } else if (player2[1] > 0 && boss[0] > 0 && player2move !== 4) {
                PSIexecution()
            }
    }
    if ((player1[1] > 0 || player2[1] > 0) && boss[0] > 0 && (player1move !== 4 || player2move !== 4)) {
            /* Boss turn */
            bossAction()       
    }
}

function initApp () {
    player1[0] = prompt("What is Player 1's name?")
    player2[0] = prompt("Now write Player 2's name...")
    turn()
}

function renameTag (value) {
    const h1El = document.querySelector('#titulo')
    h1El.innerHTML = `Ola, ${value}`
    console.log(value)
    console.log(`Player 1 ação: ${player1move}`)
    console.log(`Player 2 ação: ${player2move}`)
}
// Minha branch
window.onload = function() {
    initApp()
    if (boss[0] <= 0) {
        alert("Boss was defeated!")
        alert("You won!")
    }
    if (player1[1] <= 0 && player2[1] <= 0) {
        alert("You were hurt and beaten...")
        alert(player1[0] + " lost the battle...")
    }
}