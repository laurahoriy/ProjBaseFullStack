# TODO - Estoque funcionando

- [x] Atualizar `app/hooks/useEstoque.tsx` para exportar `estoques` e `listarEstoques()` (necessário para `app/estoque/page.tsx`).
- [x] Implementar `listarEstoques()` chamando o endpoint correto do backend (provável `GET /estoque/`).
- [x] Ajustar payload e preparo de edição para compatibilidade com o Spring (campos `idProduto`/`id_produto`/`produto`).
- [ ] Rodar `npm run dev` e validar:
  - [ ] Página `/estoque` lista itens
  - [ ] Link `/estoque/[id]` carrega edição
  - [ ] Criar/Atualizar estoque funciona
