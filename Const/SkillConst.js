"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SkillConst_1;
Object.defineProperty(exports, "__esModule", { value: true });
const GameSystem_1 = require("GameSystem");
const Bane_1 = require("Bane");
const HealingMatrix_1 = require("HealingMatrix");
const VortexEffect_1 = require("VortexEffect");
const Fireball_1 = require("Fireball");
const FlameEffect_1 = require("FlameEffect");
const FlamePalm_1 = require("FlamePalm");
const Knife_1 = require("Knife");
const MoonEffect_1 = require("MoonEffect");
const PersistentHeal_1 = require("PersistentHeal");
const SkillEffectBase_1 = require("SkillEffectBase");
const StarEffect_1 = require("StarEffect");
const ThunderEffect_1 = require("ThunderEffect");
const WindEffect_1 = require("WindEffect");
const BulletEffect_1 = require("BulletEffect");
const GameFight_1 = require("GameFight");
const { ccclass, property } = cc._decorator;
let SkillConst = class SkillConst extends cc.Component {
    static { SkillConst_1 = this; }
    SkillEffectBase = [];
    static instance = null;
    FastAtk(caster) {
        for (let i = 0; i < 5; i++) {
            const node = caster.curpannel.Createbuttet();
            node.setPosition(caster.node.getPosition());
            node.getComponent(BulletEffect_1.default).init(i, 2, caster, caster.target, () => {
                let dmg;
                if (caster.AtkAddition > 1) {
                    dmg = caster.GetBaseAtkValue() * caster.AtkAddition;
                    caster.AtkAddition = 1;
                }
                else {
                    dmg = caster.GetBaseAtkValue();
                }
                dmg *= 0.5;
                caster.target.doAttack(dmg, caster.role.hit, false, false);
            });
        }
    }
    Shield(caster) {
        const team = caster.curpannel.GetTeam();
        let minHp = 0;
        let idx = 0;
        for (let i = 0; i < team.length; i++) {
            if (minHp == 0) {
                minHp = team[i].role.hp;
                idx = i;
            }
            else if (team[i].role.hp < minHp) {
                minHp = team[i].role.hp;
                idx = i;
            }
        }
        team[idx].setShield(caster.role.skill2num);
    }
    GuideFireBall(caster) {
        const node = caster.curpannel.CreateFireBall();
        const startPos = caster.node.getPosition();
        node.setPosition(startPos);
        node.getComponent(Fireball_1.default).Guideinit(caster, () => {
            const monsters = caster.curpannel.GetMontser();
            const dmg = caster.GetBaseAtkValue() * caster.role.skill1num;
            for (let i = 0; i < monsters.length; i++) {
                const pos = monsters[i].node.getPosition();
                if (startPos.sub(pos).mag() <= 200) {
                    monsters[i].doAttack(dmg, caster.role.hit, false, false);
                }
            }
        });
    }
    Eddy(caster) {
        caster.curpannel.CreateEddy().getComponent(VortexEffect_1.default).init(caster, () => {
            const team = caster.curpannel.GetTeam();
            for (let i = 0; i < team.length; i++) {
                let dmg;
                if (caster.AtkAddition > 1) {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum * caster.AtkAddition;
                    caster.AtkAddition = 1;
                }
                else {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
                }
                team[i].doAttack(dmg, caster.role.hit, false, false);
            }
        });
    }
    Tofly(caster) {
        const team = caster.curpannel.GetTeam();
        let minDist = 0;
        let nearestIdx = 0;
        const startPos = caster.node.getPosition();
        for (let i = 0; i < team.length; i++) {
            const d = team[i].node.getPosition().sub(startPos).mag();
            if (minDist == 0) {
                nearestIdx = i;
                minDist = d;
            }
            else if (d <= minDist) {
                minDist = d;
                nearestIdx = i;
            }
        }
        const target = team[nearestIdx];
        const dur = 0.1 / GameSystem_1.default.speed;
        const offset = caster.node.position.sub(target.node.position);
        cc.tween(caster.Content).by(dur, {
            position: cc.v3(-offset.x / 2, -offset.y / 2, 0),
        }).call(() => {
            const dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
            target.doAttack(dmg, caster.role.hit, false, false);
            caster.Cure(dmg);
            target.Tofly(caster);
        }).by(dur, {
            position: cc.v3(offset.x / 2, offset.y / 2, 0),
        }).call(() => {
        }).start();
    }
    PersistentHeal(caster) {
        const team = caster.curpannel.GetTeam();
        for (let i = 0; i < team.length; i++) {
            const node = caster.curpannel.CreatePersistCure();
            node.setParent(team[i].SpineContent);
            node.getComponent(PersistentHeal_1.default).init(team[i], caster.role.skill1num);
        }
    }
    CureAll(type, caster) {
        if (type == 0) {
            const team = caster.curpannel.GetTeam();
            for (let i = 0; i < team.length; i++) {
                const dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
                team[i].Cure(dmg);
            }
        }
        else {
            const monsters = caster.curpannel.GetMonster();
            for (let i = 0; i < monsters.length; i++) {
                const dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
                monsters[i].Cure(dmg);
            }
        }
    }
    BaneMatrix(type, caster) {
        caster.curpannel.CreateBaneMatrix().getComponent(Bane_1.default).init(type, caster);
    }
    FireBall(caster) {
        const node = caster.curpannel.CreateFireBall();
        const startPos = caster.node.getPosition();
        node.setPosition(startPos);
        node.getComponent(Fireball_1.default).init(caster, () => {
            const monsters = caster.curpannel.GetMonster();
            const dmg = caster.GetBaseAtkValue() * caster.role.skill1num;
            for (let i = 0; i < monsters.length; i++) {
                const pos = monsters[i].node.getPosition();
                if (startPos.sub(pos).mag() <= 200) {
                    monsters[i].doAttack(dmg, caster.role.hit, false, false);
                }
            }
        });
    }
    TeamThunder(caster) {
        const lj = caster.curpannel.CreateSkillLJ();
        lj.setPosition(cc.v2(0, 375));
        const ljSk = lj.getComponent(sp.Skeleton);
        ljSk.setAnimation(0, "ef13_bg", false);
        ljSk.setCompleteListener(() => {
            GameSystem_1.default.SkillLJ.restor(lj);
        });
        const monsters = caster.curpannel.GetMonster();
        const fire = (i) => {
            const tn = caster.curpannel.CreateThunder();
            tn.setParent(monsters[i].SpineContent);
            tn.getComponent(ThunderEffect_1.default).init(() => {
                const dmg = caster.GetBaseAtkValue() * caster.role.skill3num;
                monsters[i].doAttack(dmg, caster.role.hit, false, false);
                monsters[i].Constraint(caster);
            });
        };
        for (let i = 0; i < monsters.length; i++)
            fire(i);
    }
    TeamStar(type, caster) {
        const self = this;
        this.SkillEffectBase[0].getComponent(SkillEffectBase_1.default).init(() => {
            self.SkillEffectBase[1].node.active = true;
            self.SkillEffectBase[2].node.active = true;
            self.SkillEffectBase[3].node.active = true;
            self.SkillEffectBase[1].setAnimation(0, "ef8_3", false);
            self.SkillEffectBase[2].setAnimation(0, "ef8_2", false);
            self.SkillEffectBase[3].setAnimation(0, "ef8_bg", false);
            const monsters = caster.curpannel.GetMonster();
            const dmg = caster.GetBaseAtkValue() * caster.role.skill1num;
            const fire = (idx) => {
                for (let k = 0; k < 3; k++) {
                    setTimeout(() => {
                        monsters[idx].doAttack(dmg, caster.role.hit, false, true);
                        const hit = GameFight_1.GameFight.instance.CreatewzlxHit();
                        hit.setPosition(monsters[idx].node.getPosition());
                        const sk = hit.getComponent(sp.Skeleton);
                        sk.setAnimation(0, "ef8_3", false);
                        sk.setCompleteListener(() => {
                            GameSystem_1.default.wzlxHit.restor(hit);
                        });
                    }, 200 * k);
                }
            };
            for (let i = 0; i < monsters.length; i++)
                fire(i);
            self.SkillEffectBase[2].setCompleteListener(() => {
                self.SkillEffectBase[1].node.active = false;
                self.SkillEffectBase[2].node.active = false;
                self.SkillEffectBase[3].node.active = false;
            });
        });
    }
    onLoad() {
        SkillConst_1.instance = this;
    }
    FourAtk(caster) {
        for (let i = 0; i < 4; i++) {
            const node = caster.curpannel.Createbuttet();
            node.setPosition(caster.node.getPosition());
            node.getComponent(BulletEffect_1.default).init(i, 3, caster, caster.target, () => {
                const dmg = caster.GetBaseAtkValue() * caster.role.skill2num;
                caster.target.doAttack(dmg, caster.role.hit, false, false);
            });
        }
    }
    MoonEffect(type, caster) {
        let dmg;
        if (caster.AtkAddition > 1) {
            dmg = caster.GetBaseAtkValue() * caster.AtkAddition;
            caster.AtkAddition = 1;
        }
        else {
            dmg = caster.GetBaseAtkValue();
        }
        dmg *= caster.role.initiative;
        const node = caster.curpannel.CreateMoon();
        node.setPosition(cc.v2(caster.node.x, caster.node.y));
        node.getComponent(MoonEffect_1.default).init(type, dmg, caster, caster.target);
    }
    WindEffect(type, caster) {
        let dmg;
        if (caster.AtkAddition > 1) {
            dmg = caster.GetBaseAtkValue() * caster.AtkAddition;
            caster.AtkAddition = 1;
        }
        else {
            dmg = caster.GetBaseAtkValue();
        }
        dmg *= 0.5;
        const node = caster.curpannel.CreateWind();
        node.setPosition(cc.v2(caster.node.x, caster.node.y));
        node.getComponent(WindEffect_1.default).init(type, dmg, caster, caster.target);
    }
    update() { }
    GuideThunder(caster) {
        const lj = caster.curpannel.CreateSkillLJ();
        lj.setPosition(cc.v2(0, 0));
        const ljSk = lj.getComponent(sp.Skeleton);
        ljSk.setAnimation(0, "ef13_bg", false);
        ljSk.setCompleteListener(() => {
            GameSystem_1.default.SkillLJ.restor(lj);
        });
        const monsters = caster.curpannel.GetMontser();
        const fire = (i) => {
            const tn = caster.curpannel.CreateThunder();
            tn.setParent(monsters[i].Spine);
            tn.getComponent(ThunderEffect_1.default).init(() => {
                const dmg = 5 * caster.GetBaseAtkValue();
                monsters[i].doAttack(dmg, caster.role.hit, false, false);
                monsters[i].Constraint();
            });
        };
        for (let i = 0; i < monsters.length; i++)
            fire(i);
    }
    GuideBaneMatrix(type, caster) {
        caster.curpannel.CreateBaneMatrix().getComponent(Bane_1.default).init(type, caster);
    }
    Sneer(caster) {
        const monsters = caster.curpannel.GetMonster();
        for (let i = 0; i < monsters.length; i++)
            monsters[i].setTarget(caster);
    }
    HealingMatrix(type, caster) {
        const node = caster.curpannel.CreateCureMatrix();
        let dmg;
        if (caster.AtkAddition > 1) {
            dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum * caster.AtkAddition;
            caster.AtkAddition = 1;
        }
        else {
            dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
        }
        node.getComponent(HealingMatrix_1.default).init(type, caster, dmg);
    }
    Flamepalm(caster) {
        const node = caster.curpannel.CreateFlamepalm();
        const startPos = caster.node.getPosition();
        node.setPosition(startPos);
        const dmg = caster.GetBaseAtkValue() * caster.role.skill1num;
        node.getComponent(FlamePalm_1.default).init(caster, () => {
            const monsters = caster.curpannel.GetMonster();
            for (let i = 0; i < monsters.length; i++) {
                const pos = monsters[i].node.getPosition();
                if (startPos.sub(pos).mag() <= 200) {
                    monsters[i].doAttack(dmg, caster.role.hit, false, false);
                    const flame = caster.curpannel.CreateFlame();
                    flame.setParent(monsters[i].SpineContent);
                    flame.getComponent(FlameEffect_1.default).init(monsters[i]);
                }
            }
        });
    }
    StarEffect(type, caster) {
        for (let i = 0; i < 15; i++) {
            const node = caster.curpannel.CreateStar();
            let dmg;
            if (caster.AtkAddition > 1) {
                dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum * caster.AtkAddition;
                caster.AtkAddition = 1;
            }
            else {
                dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
            }
            node.getComponent(StarEffect_1.default).init(type, caster, i, dmg);
        }
    }
    ThunderEffect(caster) {
        const team = caster.curpannel.GetTeam();
        const fire = (i) => {
            const tn = caster.curpannel.CreateThunder();
            tn.setParent(team[i].SpineContent);
            tn.getComponent(ThunderEffect_1.default).init(() => {
                let dmg;
                if (caster.AtkAddition > 1) {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum * caster.AtkAddition;
                    caster.AtkAddition = 1;
                }
                else {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
                }
                if (caster.Suck > 0) {
                    caster.Cure(dmg * caster.Suck);
                    caster.Suck = 0;
                }
                team[i].doAttack(dmg, caster.role.hit, false, false);
            });
        };
        for (let i = 0; i < team.length; i++)
            fire(i);
    }
    Knife(type, caster) {
        let count = Math.floor(2 * Math.random()) + 5;
        if (type == 0)
            count = 5;
        for (let i = 0; i < count; i++) {
            const node = caster.curpannel.CreateKnife();
            let dmg;
            if (type == 0) {
                dmg = caster.GetBaseAtkValue() * caster.role.skill1num;
                node.setPosition(cc.v2(-600, 250));
            }
            else {
                if (caster.AtkAddition > 1) {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum * caster.AtkAddition;
                    caster.AtkAddition = 1;
                }
                else {
                    dmg = caster.GetBaseAtkValue() * caster.fatality.skillNum;
                }
                node.setPosition(cc.v2(500, 250));
            }
            if (type == 0) {
                node.getComponent(Knife_1.default).initTeamer(type, caster, dmg, i);
            }
            else {
                node.getComponent(Knife_1.default).initMonster(type, caster, dmg, i);
            }
        }
    }
};
__decorate([
    property(sp.Skeleton)
], SkillConst.prototype, "SkillEffectBase", void 0);
SkillConst = SkillConst_1 = __decorate([
    ccclass
], SkillConst);
exports.default = SkillConst;
