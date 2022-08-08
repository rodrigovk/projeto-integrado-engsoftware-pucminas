/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUsuario` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_usuario" SERIAL NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario");

-- CreateTable
CREATE TABLE "Administrador" (
    "id_administrador" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "situacao" INTEGER NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id_administrador")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "situacao" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "cnpj_cpf" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_id_usuario_key" ON "Administrador"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_usuario_key" ON "Cliente"("id_usuario");

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
