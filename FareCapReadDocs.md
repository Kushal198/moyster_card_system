# How the Fare Capping Works in the Code
## Step 1: Start and Complete a Journey

- A journey is created via MoysterCardService.startJourney(card, entryStation, time).
- Once the journey ends with completeJourney(card, exitStation, journey):
- Base fare is calculated using FareCalculationServiceImpl.
- Fare capping is applied using FareCappingServiceV2Impl.

## Step 2: Farthest Zone Calculation

- The farthest zone pair determines the cap (e.g., if most journeys are within Zone 1, cap = 100; if one journey travels Zone 1 → Zone 2, cap = 120).
- Utility function getFarthestZoneRange(journeys: Journey[]) computes the highest zone traveled in a day or week.

```function getFarthestZoneRange(journeys: Journey[]): string {
  let maxRange = [1, 1];
  for (const j of journeys) {
    const from = j.getEntryStation().getZone().getId();
    const to = j.getExitStation()?.getZone().getId() ?? from;
    const low = Math.min(from, to);
    const high = Math.max(from, to);
    if (high > maxRange[1]) maxRange = [low, high];
  }
  return `${maxRange[0]}-${maxRange[1]}`;
}
```

## Step 3: Strategy Pattern

- FareCappingServiceV2Impl applies multiple strategies in sequence:
- DailyCapStrategy: ensures daily fare does not exceed daily limit.
- WeeklyCapStrategy: ensures weekly fare does not exceed weekly limit.

```adjustFare(card: MoysterCard, journey: Journey, baseFare: number): number {
  let adjustedFare = baseFare;

  const dateKey = Helper.getDateKey(journey.getStartTime());
  const fareCap: capMap = caps[getFarthestZoneRange(card.getJourneysByDate(dateKey))];

  for (const strategy of this.strategies) {
    adjustedFare = strategy.applyCap(journey, adjustedFare, fareCap);
  }

  journey.setFare(adjustedFare);
  return adjustedFare;
```

### Each strategy has an applyCap() method that takes:

- Journey
- Current fare
- Fare cap (daily or weekly)

### Strategies are independent and reusable due to the strategy pattern.

## Step 4: Update Journey and Deduct Balance

After capping is applied:

- journey.setFare(adjustedFare) updates the journey.
- MoysterCardService deducts the fare from the card balance.

## Location in Code

- Service: src/services/FareCappingServiceV2.ts → FareCappingServiceV2Impl
- Strategies: src/strategy/DailyCapStrategy.ts and WeeklyCapStrategy.ts
- Integration: Called from MoysterCardService.completeJourney()

## Summary Flow
```
For each journey:
  1. Calculate base fare (peak/off-peak, zone pair)
  2. Apply Daily Cap Strategy
      - Check total fare for the day
      - If total + currentFare > dailyCap, adjust fare
  3. Apply Weekly Cap Strategy
      - Check total fare for the week
      - If total + currentFare > weeklyCap, adjust fare
  4. Set journey fare and deduct from card

```