# Dokumentation

## Einleitung
In dieser Dokumentation wird die Anwendung der Prinzipien der funktionalen Programmierung in der entwickelten Passwort-Safe-App beschrieben. Diese App ermöglicht Benutzern, Passwörter sicher zu speichern, zu sortieren, zu durchsuchen und zu verwalten. Dabei wurden verschiedene funktionale Programmierkonzepte eingesetzt, um eine robuste und erweiterbare Anwendung zu erstellen.

## Anwendung der funktionalen Programmierung
Kompetenz AE1
### 1. Pure Functions
In der Passwort-Safe-App wurden reine Funktionen verwendet, um sicherzustellen, dass Funktionen keine Seiteneffekte haben und bei gleichen Eingaben stets die gleichen Ausgaben liefern. Ein Beispiel dafür ist die Sortierfunktion, die die Passwort-Einträge sortiert, ohne die ursprünglichen Daten zu verändern. Diese Funktion nimmt die Daten als Eingabe, sortiert sie und gibt eine neue sortierte Liste zurück.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/b9a5c0e1-d8bf-4251-91da-19a2d9db4147" alt="Bildbeschreibung" height="200">

### 2. Immutable Values
Um die Unveränderlichkeit von Daten sicherzustellen, wurden alle Datenstrukturen so konzipiert, dass sie bei Änderungen neue Kopien erstellen, anstatt die Originaldaten zu modifizieren. Ein Beispiel dafür ist die Verwaltung der Passwort-Einträge, bei der Änderungen an den Einträgen stets zu neuen Kopien der Liste führen

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/4fcded1a-8b89-4ebc-803e-02470a5255cd" alt="Bildbeschreibung" width="400">

### 3. Higher-Order Functions
Kompetenz C4E

Higher-Order Functions wurden verwendet, um flexiblen und wiederverwendbaren Code zu schreiben. Ein Beispiel hierfür ist die Filterfunktion, die eine Funktion als Parameter akzeptiert und auf die Liste der Passwort-Einträge anwendet.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/b9cbc17c-3771-46c8-ac4f-253c54747d18" alt="Bildbeschreibung" width="400">

### 4. Lambda-Ausdrücke
Kompetenz C3E

Lambda-Ausdrücke wurden verwendet, um kompakte und anonyme Funktionen zu definieren, die häufig als Argumente für Higher-Order Functions verwendet werden. Dies ermöglicht eine klare und prägnante Codebasis, wie im folgenden Beispiel für die Suchfunktion:

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/c9914ff0-1d8f-4c87-905b-d43a14b95714" alt="Bildbeschreibung" width="400">

## Implementierte Funktionen und Erweiterungen
### 1. Sortierfunktion
Die Sortierfunktion ermöglicht es, die Passwort-Einträge nach verschiedenen Kriterien auf- oder absteigend zu sortieren. Diese Funktion nutzt pure functions, um die Einträge zu sortieren, ohne die ursprünglichen Daten zu verändern.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/69ffd20c-4f1a-4d60-8c77-c669806d852e" width="400">

### 2. Suchfunktion
Die Suchfunktion durchsucht alle gespeicherten Einträge nach einem spezifischen Begriff und verwendet Higher-Order Functions und Lambda-Ausdrücke, um eine flexible und erweiterbare Suche zu ermöglichen.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/19a740a4-f2a6-4ca1-ae31-d1d6b46d2821" width="400">

### 3. Paging-Funktion
Die Paging-Funktion ermöglicht es, große Datenmengen in überschaubaren Seiten zu navigieren. Dabei wird die Liste der Passwort-Einträge in kleine, unveränderliche Chunks unterteilt, um eine effiziente Anzeige zu gewährleisten.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/88a2e316-6582-47f3-9f17-8eca7f90505d" width="400">

### 4. Filterfunktionen
Die Filterfunktionen ermöglichen es den Benutzern, die Einträge nach bestimmten Kriterien zu filtern. Dabei werden Immutable Data Structures verwendet, um sicherzustellen, dass die Originaldaten unverändert bleiben.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/08027ef0-2053-4155-9fa5-bd0f0dccabf5" width="400">

## Beispiele aus dem Projekt
Kompetenz BE1
### 1. Sortierfunktion
Die folgende Codezeile zeigt die Implementierung der Sortierfunktion, die die Passwort-Einträge nach verschiedenen Kriterien sortiert:

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/141d82ad-1d85-41a7-b3d3-0d40a85be750" width="400">

Diese Lösung wurde gewählt, weil sie eine klare Trennung zwischen Daten und Logik ermöglicht und die Datenintegrität gewährleistet.
### 2. Suchfunktion
Die folgende Codezeile zeigt die Implementierung der Suchfunktion, die über alle gespeicherten Einträge nach einem spezifischen Begriff sucht:

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/54d3fc38-90a9-49d0-8b26-74c78bbea674" width="400">

Diese Lösung wurde gewählt, weil sie eine flexible und erweiterbare Suche ermöglicht und die Verwendung von Higher-Order Functions und Lambda-Ausdrücken den Code klar und prägnant hält.

## Reflexion und Herausforderungen
### 1. Herausforderungen
Eine der größten Herausforderungen war die Sicherstellung der Datenintegrität bei der Implementierung der funktionalen Programmierung. Es war wichtig, dass Funktionen keine Seiteneffekte haben und dass Datenstrukturen unveränderlich bleiben. Die Umstellung von imperativer auf funktionale Programmierung erforderte ein Umdenken und eine gründliche Planung der Datenflüsse.
### 2. Vorteile
Die klare Trennung von Daten und Funktionen durch pure functions und die Nutzung von Immutable Data Structures haben nicht nur die Code-Qualität verbessert, sondern auch die Wartbarkeit und Erweiterbarkeit der Anwendung wesentlich erleichtert. Beispielsweise war die Implementierung der Sortier- und Suchfunktionen durch die Verwendung von Higher-Order Functions und Lambda-Ausdrücken besonders effektiv.
Ein weiteres Beispiel, wo die funktionale Programmierung im Projekt entscheidend war, ist die Implementierung der Paging-Funktion. Durch die Nutzung von Immutable Data Structures und die Anwendung von Higher-Order Functions konnte effizient durch große Datenmengen navigiert werden, was die Benutzererfahrung deutlich verbesserte. Beispiele für die Verwendung sind, Beim Hinzufügen einer neuen Kategorie, Beim Bearbeiten eines Anmeldeeintrags, Beim Löschen eines Anmeldeeintrags, Beim Abrufen von Anmeldedaten nach Änderung der Kategorie.
Durch die Verwendung funktionaler Programmierung konnten komplexe Operationen wie das Filtern und Paginieren auf eine Weise implementiert werden, die den Code lesbarer und wartbarer macht. 
