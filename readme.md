## Grafici

- Bubble:
	* Asse X: numero scuole;
	* Asse Y: numero popolazione;
	* Asse Z: numero alunni;
	* Ogni bubble è un elemento differente;
	* Per regioni va bene, ma per provincia e comune non è possibile, ci sono troppi elementi/colori.
- Scatter/dot:
	* Asse X: numero scuole;
	* Asse Y: nome regioni;
	* Asse Z: numero alunni;
	* Per regioni va bene, ma per provincia e comune non è possibile, troppi elementi nell'asse Y.
- Choropleth per regioni:
	* Colorare la regione in base al nome più frequente (solo il più frequente);
- Choropleth per provincie:
	* Colorare la provincia in base al nome più frequente (solo il più frequente);
	* Gli elementi sono troppi (circa 32) meglio passare alle categorie di nomi (politici, religiosi...).
- Choropleth per comune:
	* Colorare la provincia in base al nome più frequente (solo il più frequente);
	* Gli elementi sono troppi (circa 32) meglio passare alle categorie di nomi (politici, religiosi...).

## Cambiamenti al dataset

- allData: il merge dei dati più recenti dell'anagrafica delle scuole:
	* Regione EMILIA ROMAGNA -> EMILIA-ROMAGNA.
	* Regione FRIULI-VENEZIA G. -> FRIULI-VENEZIA GIULIA.
	* Regione TRENTINO-ALTO ADIGE/bblabla -> TRENTINO-ALTO ADIGE.
	* Provincia FORLI'-CESENA -> FORLI-CESENA.
	* Provincia PESARO E URBINO -> PESARO-URBINO.
	* Provincia MONZA E DELLA BRIANZA -> MONZA-BRIANZA.
- oldData: il merge dei dati 2017/2018 dell'anagrafica delle scuole (per metcharli con i dati degli alunni):
	* Regione EMILIA ROMAGNA -> EMILIA-ROMAGNA.
	* Regione FRIULI-VENEZIA G. -> FRIULI-VENEZIA GIULIA.
	* Regione TRENTINO-ALTO ADIGE/bblabla -> TRENTINO-ALTO ADIGE.
	* REGIONE VALLE D'AOSTA/Blalbla -> VALLE D'AOSTA.
	* Provincia FORLI E CESENA -> FORLI-CESENA.
	* Provincia MONZA E DELLA BRIANZA -> MONZA-BRIANZA.
	* Provincia PESARO E URBINO -> PESARO-URBINO.
	* Provincia MASSA -> MASSA-CARRARA.
	* Provincia VALLE D'AOSTA/BLABLA -> AOSTA.