export default class SkillConst extends cc.Component {
    SkillEffectBase: sp.Skeleton[];
    static instance: SkillConst | null;
    FastAtk(caster: any): void;
    Shield(caster: any): void;
    GuideFireBall(caster: any): void;
    Eddy(caster: any): void;
    Tofly(caster: any): void;
    PersistentHeal(caster: any): void;
    CureAll(type: number, caster: any): void;
    BaneMatrix(type: number, caster: any): void;
    FireBall(caster: any): void;
    TeamThunder(caster: any): void;
    TeamStar(type: number, caster: any): void;
    protected onLoad(): void;
    FourAtk(caster: any): void;
    MoonEffect(type: number, caster: any): void;
    WindEffect(type: number, caster: any): void;
    update(): void;
    GuideThunder(caster: any): void;
    GuideBaneMatrix(type: number, caster: any): void;
    Sneer(caster: any): void;
    HealingMatrix(type: number, caster: any): void;
    Flamepalm(caster: any): void;
    StarEffect(type: number, caster: any): void;
    ThunderEffect(caster: any): void;
    Knife(type: number, caster: any): void;
}
