# MoysterCard Fare Calculation System

A TypeScript-based fare calculation engine for Londinium metro system.  
Commuters tap their MoysterCard at entry and exit stations, and the system calculates the fare based on **zones** and **time of travel**, applying **daily** and **weekly fare caps** automatically.

---

## Requirements For MoysterCard
- Commuters tap their MoysterCard at entry and exit stations.
- The system muste be able to calculate the fare based on entry and exit **zone pairs (1–1, 1–2, 2–2)**.
- The system has time-based fare Rules 
    **Peak hours:**
    - Monday–Friday: 07:00–10:30, 17:00–20:00  
    - Saturday–Sunday: 09:00–11:00, 18:00–22:00  
    All other times are **off-peak**.
- The system must be able to calculate fares based on **time of travel**: **peak** and **off-peak**.
- The system must have a fare capping feature that applies **daily** and **weekly** caps.
- The fare cap must be reset after 24 hours for daily cap and after 7 days for weekly cap.
- ### Fare Capping Rules
  - The daily and weekly fare caps limit how much a commuter can be charged in a given period.
  - The applicable cap is based on the farthest zone combination traveled during that day or week.
    - Example: If all journeys are within Zone 1 except one journey to Zone 2, the Zone 1–2 cap applies.

---
## Actors
We have two main actors in our system:

- Commuter
    The commuter is the user of the metro system who holds a MoysterCard and travels between stations. The commuter interacts with the system by tapping the card at the entry and exit points, and can query total fares for their journeys.

- System
    The system is responsible for managing the fare calculation and fare capping. It records journeys, calculates fares based on zones and peak/off-peak timings, applies daily and weekly caps, and provides the commuter with their total fare.

---
## 🧱 Architecture Diagrams

### 🧩 Use Case Diagram
![Use Case Diagram](./moyester-card.png)

### 🏗️ Class Diagram
![Class Diagram](./moyster_class_card.svg)


To run the project and see the tests in action, follow these steps:
```bash
npm install
npm run test
