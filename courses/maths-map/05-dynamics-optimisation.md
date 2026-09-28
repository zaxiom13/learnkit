---
title: Chaos, optimisation and numerical methods
blurb: Why weather is unpredictable, how every model is trained, and how computers actually solve equations.
section: Workhorses
---

## Chaos

Deterministic but unpredictable: tiny differences grow exponentially (positive **Lyapunov exponent**). **Lorenz (1963)**: a toy weather model → the butterfly effect and strange attractors. Other names: **logistic map** and its period-doubling route to chaos (**Feigenbaum constant** δ ≈ 4.669, universal), **fractals** (Mandelbrot set), **KAM theorem** (which orbits survive perturbation), **ergodicity** (time average = ensemble average — and why it fails for wealth: see *ergodicity economics*).

```viz lorenz
> The butterfly effect. Two runs of Lorenz's weather model start a millionth apart, then go their separate ways on the same attractor.
```

## Optimisation

| class | property | tools |
|---|---|---|
| **Convex** | any local minimum is global | gradient descent, Newton, interior-point; linear/quadratic programming (portfolio optimisation) |
| **Non-convex** | many local minima | SGD/Adam (deep learning), simulated annealing, genetic algorithms |
| **Discrete / integer** | NP-hard in general | branch and bound, MILP solvers (Gurobi, CPLEX), SAT solvers |
| **Constrained** | limits on variables | Lagrange multipliers, KKT conditions |
| **Dynamic programming** | optimal substructure | Bellman equation — control, RL, option exercise |

```viz logistic
> The logistic map: period doubling → chaos. Drag r and watch the orbit split.
```

## Numerical methods — names to use

- ODEs: **Euler** (simple, unstable), **Runge–Kutta 4**, **symplectic integrators** (conserve energy long-term — orbits, molecular dynamics).
- PDEs: **finite difference**, **finite element** (engineering), **spectral methods**, **finite volume** (fluids).
- Linear systems: LU, **conjugate gradient**, multigrid.
- Randomness: **Monte Carlo** (error ∝ 1/√N regardless of dimension), quasi-Monte Carlo.
- Always ask: **stability, convergence, conditioning, floating-point error** (IEEE 754 double ≈ 16 decimal digits).

```viz montecarlo
> Monte Carlo: random darts estimate π. The error falls like 1/√N, visible as a −½ slope on the log–log plot.
```

```choice
? You simulate a planet's orbit for a million years and energy slowly drifts. What to ask the AI for?
- [x] A symplectic integrator (e.g. leapfrog/Verlet) // Preserves phase-space structure; energy error stays bounded.
- [ ] A smaller floating-point type
- [ ] Explicit Euler with a larger step
```

```answer
? Monte Carlo error scales as 1/√N. To cut the error by 10×, by what factor must N increase?
= 100
```

```choice
? Why is convexity so prized in optimisation?
- [x] Every local minimum is the global minimum, so simple methods find the true optimum // Mean–variance portfolio optimisation is convex.
- [ ] Convex problems have no solution
- [ ] Convex functions can't be differentiated
```

```viz gradient
> Non-convex optimisation: two basins. A convex problem would have just one, and any downhill method would find it.
```

```reflect
? Explain why chaos doesn't mean "random".
- fully deterministic equations
- sensitive dependence on initial conditions → practical unpredictability
- structure remains: attractors, statistics, predictable climate vs unpredictable weather
model: Chaotic systems follow exact deterministic rules — rerun with identical starting conditions and you get identical results. But errors grow exponentially, so any imprecision ruins long-range prediction. Structure survives: trajectories stay on a strange attractor and have stable statistics, which is why climate is predictable even though weather two weeks out isn't.
```

```recall Chaos and optimisation
? Three results to carry around.
A positive Lyapunov exponent means nearby trajectories diverge exponentially: chaos. In a convex problem, every local minimum is a global minimum. Monte Carlo error shrinks like one over the square root of N, whatever the dimension.
```

```cards
Lyapunov exponent :: Rate of exponential divergence of nearby trajectories.
Feigenbaum δ :: ≈ 4.669; universal period-doubling ratio.
Convex optimisation :: Local = global minimum.
Symplectic integrator :: Long-term stable for Hamiltonian systems.
Monte Carlo :: Error ∝ 1/√N, independent of dimension.
Bellman equation :: Recursive optimality — heart of dynamic programming and RL.
