-- DropForeignKey
ALTER TABLE "ticket_resposta" DROP CONSTRAINT "ticket_resposta_id_administrador_fkey";

-- DropForeignKey
ALTER TABLE "ticket_resposta" DROP CONSTRAINT "ticket_resposta_id_cliente_fkey";

-- AlterTable
ALTER TABLE "ticket_resposta" ALTER COLUMN "id_administrador" DROP NOT NULL,
ALTER COLUMN "id_cliente" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_resposta" ADD CONSTRAINT "ticket_resposta_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "administrador"("id_administrador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_resposta" ADD CONSTRAINT "ticket_resposta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;
