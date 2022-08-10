-- CreateTable
CREATE TABLE "ticket" (
    "id_ticket" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "assunto" TEXT NOT NULL,
    "situacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "ticket_resposta" (
    "id_ticket" INTEGER NOT NULL,
    "id_resposta" SERIAL NOT NULL,
    "id_administrador" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,

    CONSTRAINT "ticket_resposta_pkey" PRIMARY KEY ("id_ticket","id_resposta")
);

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_resposta" ADD CONSTRAINT "ticket_resposta_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "ticket"("id_ticket") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_resposta" ADD CONSTRAINT "ticket_resposta_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "administrador"("id_administrador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_resposta" ADD CONSTRAINT "ticket_resposta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;
