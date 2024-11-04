export class CalcMailDto{
    readonly cargo: {
        point_a: string;
        point_b: string;
        places: [
            {
                volume: {
                    height: string;
                    length: string;
                    width: string;
                    value: string;
                },
                weight: {
                    value: string;
                },
                same_places: string;
                estimated_price_cargo: string;
                cargo_type: string;
                packing: {
                    pallet: boolean;
                    pallet_board: boolean;
                    stretch_film: boolean;
                    wooden: boolean;
                };
                count_packing: string;
            }
        ]
    };
    readonly sender: {
        INN: string;
        KPP: string;
        address: string;
        name: string;
        org_name: string;
        pick_up_date: string;
        tel: string;
    };
    readonly recipient: {
        INN: string;
        KPP: string;
        address: string;
        name: string;
        org_name: string;
        tel: string;
    };
    readonly payment_for_transportation: string;
    readonly price: string;
}