Clima_ano(
id Primary key text,
ano INTEGER  Not Null UNIQUE,
temperatura_do_globo float , - - essa bomba tem que estar em Celsius
);

Eventos_climatico (
id Primary key text,
ano data Not Null,
nome varchar(40) Not Null,
Continente_afetado varchar(40) Not Null
foreign key (ano) references Clima_ano(ano)
);

Incidentes(
id Primary key text,
ano data Not Null,
tipo varchar(50) Not Null,
cidade varchar(50) Not Null,
estado  varchar(30) Not Null,
pais varchar(30) Not Null,
continente varchar(40) Not Null
foreign key (ano) references Eventos_climatico(ano),
foreign key (Continente) references Eventos_climatico(Continente_afetado)
);

CREATE OR REPLACE FUNCTION crtI(ano INTEGER,tipo varchar(50),cidade varchar(50),estado varchar(30),pais varchar(30),continente varchar(40))
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 INSERT INTO Incidentes(ano,tipo,cidade,estado,pais,continente)
 VALUES(ano,tipo,cidade,estado,pais,continente);
RETURNS 'deu certo a insercao do incidente:',ano;
END;

CREATE OR REPLACE FUNCTION crtCa(ano INTEGER,temperatua float)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 INSERT INTO Clima_ano(ano,temperatura_do_globo)
 VALUES(ano,temperatua);
RETURNS 'deu certo a insercao do clima do ano ',ano;
END;

CREATE OR REPLACE FUNCTION crtEv(ano INTEGER,nome varchar(40),continente varchar(40))
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 INSERT INTO Eventos_climatico(ano,nome,Continente_afetado)
 VALUES(ano,nome,continente);
RETURNS 'deu certo a insercao do evento climatico';
END;

CREATE OR REPLACE FUNCTION delCa(Id integer)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 DELETE FROM Clima_ano WHERE id=Id
RETURNS 'deletado com sucesso';
END;

CREATE OR REPLACE FUNCTION delEv(Id integer)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 DELETE FROM Eventos_climatico WHERE id=Id
RETURNS 'deletado com sucesso';
END;

CREATE OR REPLACE FUNCTION delI(Id integer)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
 DELETE FROM Incidentes WHERE id=Id
RETURNS 'deletado com sucesso';
END;

CREATE OR REPLACE FUNCTION updEc(Id integer,nome varchar(40),ano integer,Continente varchar(40))
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
if(nome is null and ano is null and Continente is null) then
  RETURNS 'nao foi possivel atualizar, nenhum campo foi preenchido corretamente';
ELSE IF(nome is null and ano is null) then
  UPDATE Eventos_climatico
  SET    Continente_afetado=Continente
  WHERE id=Id;
  RETURNS 'nome e ano nao foram preenchidos, apenas o continente foi atualizado';
ELSE IF(nome is null and Continente is null) then
  UPDATE Eventos_climatico
  SET    ano=ano
  WHERE id=Id;
  RETURNS 'nome e continente nao foram preenchidos, apenas o ano foi atualizado';
ELSE IF(ano is null and Continente is null) then
  UPDATE Eventos_climatico
  SET    nome=nome
  WHERE id=Id;
  RETURNS 'continente e ano nao foram preenchidos, apenas o nome foi atualizado';
ELSE IF(nome is null) then
  UPDATE Eventos_climatico
  SET    ano=ano,Continente_afetado=Continente
  WHERE id=Id;
  RETURNS 'nome  nao foi preenchido, apenas o continente e ano foram atualizados';
ELSE IF(ano is null) then
  UPDATE Eventos_climatico
  SET    nome=nome,Continente_afetado=Continente
  WHERE id=Id;
  RETURNS 'ano  nao foi preenchido, apenas o continente e ano foram atualizados';
ELSE IF(Continente is null) then
  UPDATE Eventos_climatico
  SET    nome=nome,ano=ano
  WHERE id=Id;
  RETURNS 'nome e ano nao foram preenchidos, apenas o continente foi atualizado';
end if;
 UPDATE Eventos_climatico
 SET    nome=nome,ano=ano,Continente_afetado=continente
  WHERE id=Id
RETURNS 'deletado com sucesso';
END;

CREATE OR REPLACE FUNCTION updI(Id integer,tipo varchar(50),cidade varchar(50),estado varchar(30),pais varchar(30),continente varchar(40))
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
update Incidentes
set
 WHERE id=Id
RETURNS 'deletado com sucesso';
END;

CREATE OR REPLACE FUNCTION updCa(Id integer,ano INTEGER,temperatua float)
RETURNS text
LANGUAGE plpgsql
AS $$
if(ano is null and temperatua is null) then
  RETURNS 'nao foi possivel atualizar, nenhum campo foi preenchido corretamente';
ELSE IF(ano is null) then
Update Clima_ano
 SET 
  temperatura_do_globo=temperatua
 WHERE id=Id
RETURNS 'ano nao foi preenchido, apenas a temperatura foi atualizada';
ELSE IF(temperatua is null) then
Update Clima_ano
 SET 
  ano=ano
 WHERE id=Id
RETURNS 'temperatura nao foi preenchida, apenas o ano foi atualizado';
end if;
 UPDATE Clima_ano
 SET 
  ano=ano,
  temperatura_do_globo=temperatua
 WHERE id=Id
RETURNS 'atualizado com sucesso';
END;