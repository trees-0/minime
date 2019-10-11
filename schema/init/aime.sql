create table "aime_shop" (
    "id" integer primary key not null,
    "ext_id" integer not null,
    "name" text not null,
    "region" text not null,
    constraint "aime_shop_uq" unique ("ext_id")
);

create table "aime_machine" (
    "id" integer primary key not null,
    "shop_id" integer not null
            references "aime_shop"("id"),
    "pcb_id" text not null,
    "keychip_id" text not null,
    constraint "aime_machine_pcb_id_uq" unique ("pcb_id"),
    constraint "aime_machine_keychip_id_uq" unique ("keychip_id")
);

create table "aime_player" (
    "id" integer primary key not null,
    "ext_id" integer not null,
    "register_time" timestamp not null,
    constraint "aime_player_uq" unique ("ext_id")
);

create table "aime_card" (
    "id" integer primary key not null,
    "player_id" integer not null
            references "aime_player"("id")
            on delete cascade,
    "nfc_id" text not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "aime_card_uq" unique ("nfc_id")
);
