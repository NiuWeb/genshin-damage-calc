import { Lp } from "@src/utils/lp"
import { ResourceList, ResourcePool } from "../resources/pool"
import { CostResult, CostList } from "./type"

/**
 * Calculates the cost and runs required to obtain
 * the given upgrades from the given resource pool
 * @param pool the resource pool to get data from
 * @param stars the star level of the upgrades
 * @param upgrades the upgrades to obtain
 * @returns an object containing the upgrades and their costs/runs
 */
export function CalculateCost(pool: ResourcePool, stars: number, ...upgrades: string[]) {
    const result: CostList = {}

    for (const upgrade of upgrades) {
        const resources = pool.upgrades[stars]?.[upgrade]
        if (!resources) {
            throw new Error(`Upgrade ${upgrade} not found for ${stars} stars`)
        }
        try {
            result[upgrade] = calculateCost(pool, resources)
        } catch (e) {
            throw new Error(`cannot calculate cost for upgrade ${upgrade} at ${stars} stars: \n${e}`)
        }
    }

    return result
}


/**
 * Calculates the cost required to obtain the given resources
 * from the domains contained in the pool
 * @param pool The resource pool
 * @param upgrade The resources to obtain
 */
function calculateCost(pool: ResourcePool, upgrade: ResourceList): CostResult {
    const resources = Object.keys(upgrade)
    const domains = Object.keys(pool.domains)

    // - the decision variables are "how many times do we run each domain"
    // - the objective function is the sum of the costs of each domain run
    // - the criteria is to minimize the objective function
    // - the constraints are to obtain the required resources:
    //   - the sum of the resources obtained from each domain run must be >= the required amount

    const lp = new Lp(domains)

    // the objective function has as coefficient for each domain,
    // the cost of running that domain once.
    lp.Objective(Lp.Vars(domains, domain => (
        [domain, pool.domains[domain].cost]
    )))

    // one constraint is needed for each resource.
    // the constraints in the solver are in the form:
    //   sum of coefficients * variables <= upper bound,
    // but for this problem we have a lower bound which
    // is the required amount of resources.
    // To convert the lower bound to an upper bound,
    // we multiply the required amount by -1 and then
    // we invert the sign of the coefficients.

    // Each constraint has as coefficient for each domain,
    // and the coefficient is the amount of resources obtained
    // from that domain per run.
    for (const resource of resources) {
        lp.Constraint(Lp.Vars(domains, domain => (
            [domain, -pool.domains[domain][resource]]
        )), -upgrade[resource])
    }

    // solve the problem
    const solution = lp.Solve("min")

    if (!solution.feasible) {
        throw new Error(
            "cannot calculate cost because the problem is infeasible. " +
            "Check that the required resources are obtainable from the given domains."
        )
    }

    // the solution contains the number of times each domain must be run,
    // and the total cost of running all the domains.

    const cost = solution.result
    const vars = Lp.Vars(domains, domain => {
        const runs = solution[domain]
        if (!runs) {
            return undefined
        }
        return [domain, runs]
    })

    return { cost, ...vars }
}