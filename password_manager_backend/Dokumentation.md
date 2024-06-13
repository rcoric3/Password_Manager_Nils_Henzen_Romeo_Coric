# Dokumentation

## Aufbau Projekt
Als Programmiersprache im Frontend haben wir uns für REACT mit dem package Manager bun entschieden, da bun sehr viele Vorteile gegenüber npm bietet, primär war die Effizienz von bun für uns ausschlaggebend. Zudem hatten wir beide schon einige positive Erfahrungen mit bun gesammelt, was sich auch ausgezahlt hatte, denn wir hatten kaum Schwierigkeiten mit bun. Im Backend haben wir uns für Hono entschieden, da es gut kombinierbar ist mit bun.

## Neuer Benutzer erstellen
Um einen neuen Benutzer zu erstellen, wird wie im Bild zu sehen ist ein eigener und neuer Schlüssel erstellt, welcher der Benutzer bei sich lokal speichern muss. Anschliessend wird das Passwort, welches er eingegeben hat, gehasht und als gehashtes Passwort in der Datenbank abgespeichert. 
Der Schlüssel, welcher der Benutzer erhält bei der Erstellung seines Kontos, benötigt er, um später dass Passwort zurückzusetzen. Das Passwort, welches der Benutzer setzen möchte, muss natürlich eine gewisse Mindestsicherheit, durch Variierung der Zeichen haben. Dafür wird eine Validation durchgeführt, wobei das Passwort die in der Abbildung zusehenden Anforderungen erfüllen sollte, falls dies nicht so sein sollte, wird eine Warnung ausgegeben, welche den Benutzer daraufhin weisst.

<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/aa537f28-e16d-45ef-b028-420d884d707f" alt="Bildbeschreibung" height="200">
<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/5d33e2fb-679a-446a-82c3-ba683304f2ad" alt="Image Description" height="200">

## Passwort zurücksetzen
Bei dem zurücksetzen eines Passwortes, wird der Benutzername gebraucht, auf welchen das Konto läuft, von dem das Passwort geändert werden soll. Ebenfalls wird der, bei der Erstellung mitgegebene Schlüssel, welcher einzig artig ist und sowohl in der Datenbank als auch bei dem Benutzer auf dem Gerät gespeichert wird benötigt. Anhand von diesem Schlüssel wird klargestellt, dass es wirklich eine befugte Person ist und diese dann das Password ändern darf. Für die Änderung muss dann nur noch das neue Passwort eingegeben werden und «confirm» um sicherzustellen, dass es gewollt ist im Formular und daraufhin wird ein neuer hash in der Datenbank gespeichert.

## Login
Um sich als Benutzer in die Applikation einzuloggen, muss der Benutzername des Kontos, sowie das Passwort, wessen Hash in der Datenbank liegt, korrekt eingegeben werden. Nach einem korrekten Login wird ein Token gesetzt, was nötig ist, um die Verbindung abzusichern.
<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/bc4894a2-4c83-4d2b-bf42-256aef51fb17" alt="Image Description" height="200">

## Passwort Ver- & Entschlüsselung
Um ein Passwort, welches der Benutzer speichern möchte und zu einem späteren Zeitpunkt wieder ansehen möchte, in der Datenbank sinnvoll zu speichern, wird das Passwort auf die AES-Weise verschlüsselt. Dies ist notwendig, da das hashing hier zu nichts führen würde, weil das Passwort dann nicht entschlüsselt und als Klartext angezeigt werden kann. Ebenfalls wäre die Option gar nichts mit dem Passwort zu machen ungeeignet, weil es dann als Klartext ersichtlich in der Datenbank liegen würde. Die Verschlüsselung, sowie die Entschlüsselung sind in der Abbildung zu sehen. CryptoJS ermöglicht eine einfache und effiziente Verschlüsselung und Entschlüsselung von Daten innerhalb von Webanwendungen, sowohl auf Client- als auch auf Serverseite. Zudem ist es einfach zu integrieren, plattformunabhängig und gut dokumentiert, was eine schnelle Implementation der wichtigen Sicherheitsmechanismen ermöglicht.
<img src="https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/fe160404-f82a-4717-af2b-ffcbeab046ae" alt="Image Description" height="200">

## Reflexion 
Das Projekt selbst war teilweise sehr anspruchsvoll und regte zum Denken an, da man zuerst eine sichere und schlaue Idee braucht, wie man das Root Passwort wieder ändern kann und wie man dies abspeichert. Ebenfalls war die Verschlüsselung, welche für die zu verwaltenden Passwörter gebraucht wurde, aufwändig und kompliziert. Durch die genaue Planung am Anfang, was wie funktionieren soll, mussten wenig Änderungen an bereits Erledigtem während der Umsetzung gemacht werden, was Zeit sowie auch Aufwand sparte.

# Use Cases
## Use Case 1: Benutzer einloggen und Passwörter ansehen
Ein Benutzer möchte sich in den Passwort-Manager einloggen und seine gespeicherten Passwörter ansehen.
## Schritte:
### Benutzerregistrierung:
- Der Benutzer registriert sich mit einem Benutzernamen und einem Passwort.
- Das Passwort wird mit bcrypt gehasht und in der Datenbank gespeichert.
- Ein unique_key wird für den Benutzer generiert und ebenfalls gespeichert.
### Benutzeranmeldung:
- Der Benutzer gibt seinen Benutzernamen und sein Passwort ein.
- Das Passwort wird mit dem in der Datenbank gespeicherten Hash verglichen.
- Bei erfolgreicher Authentifizierung wird ein JWT-Token generiert und an den Benutzer zurückgegeben.
### Passwörter ansehen:
- Der Benutzer fordert seine Passwörter an, indem er den JWT-Token in der Anfrage übermittelt.
- Der Server entschlüsselt die Passwörter mit dem unique_key des Benutzers und gibt sie zurück.

## Use Case 2: Passwort ändern
Ein Benutzer möchte sein Passwort ändern. Dazu muss er seinen unique_key eingeben, ein neues Passwort und confirm eingeben
## Schritte:
### Passwortänderungsanforderung:
- Der Benutzer gibt seinen unique_key, ein neues Passwort und confirm ein.
- Das neue Passwort wird validiert.
### Passwortänderung:
- Der Server überprüft den unique_key und ändert das Passwort des Benutzers, nachdem es gehasht wurde.
