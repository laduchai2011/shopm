export type medicateOptions = {
    title: string,
    avatar: text,
    subject: string,
    object: string,
    symptom: string,
    type: string,
    price: float,
    note: string,
    catalog: text,
    information: text,
    amount: integer,
    sold: integer,
    discount: float,
    averageRating: float,
    rateCount: integer,
    status: string
    uuid_provider: uuid
}

export type medicationContextOptions = {
    medicationSate: medicateOptions,
    buyNow: any, 
    setBuyNow: React.Dispatch<React.SetStateAction<any>>
}

export type selected_medication_toBuy = medicateOptions & {
    amountToBuy?: number
} 