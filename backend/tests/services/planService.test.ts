import { searchPlans } from '../../src/services/planService';
import { describe, it, expect } from '@jest/globals';

describe('searchPlans', () => {
    it('should return sorted plans based on ascending price', () => {
        for (let page = 1; page < 5; page++) {
            const results = searchPlans({}, page);
            for (let i = 1; i < results.plans.length; i++) {
                expect(results.plans[i - 1].price).toBeLessThanOrEqual(results.plans[i].price);
            }
        }
    });
});