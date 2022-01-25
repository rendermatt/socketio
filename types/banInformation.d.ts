declare type BanInfo = {
    victim: {
        session: string
        name: string
    }
    ban: {
        sender: string
        expiry: number
        reason: string
    }
}

declare type BanAppealInfo = {
    originalBan: string,
    appealer: {
        name: string
    },
} & (
    {
        outcome: "unban"
    } | {
        outcome: "shorten",
        newExpiry: number;
    }
)