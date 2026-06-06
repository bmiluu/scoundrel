import type { PlayingCard } from "../game/types";

type Props = {
    weapon?: PlayingCard | null;
};

export function WeaponSlot({ weapon }: Props) {
    return (
        <div className="weapon">
            {weapon ? (
                <img src={weapon.image} />
            ) : (
                <span>No weapon</span>
            )}
        </div>
    );
}