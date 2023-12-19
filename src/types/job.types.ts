type job = {
    _id: string,
    title: string,
    price: number,
    details: string,
    user_id: {
        name: string
    },
    candidates: Array<any>,
    createdAt: string,
    updatedAt: string
}