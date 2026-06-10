"use client";

import { useReducer, useMemo, useCallback } from "react";
import type {
  CalculatorInput,
  CalculatorDerived,
  CalculatorAction,
} from "@/types/calculator";
import {
  calcN2,
  calcN1,
  getN1Simple,
  calcPartialAverage,
  calcFinalAverage,
  calcRequiredN3,
} from "@/lib/calculator/formulas";
import { resolveStatus, shouldEnableN3 } from "@/lib/calculator/rules";

const INITIAL_STATE: CalculatorInput = {
  period: "3-8",
  fieldEvaluation: "none",
  n1Partial: null,
  n1Institutional: null,
  n2Partial: null,
  n2Institutional: null,
  n2FieldScore: null,
  n3Final: null,
};

function calculatorReducer(
  state: CalculatorInput,
  action: CalculatorAction
): CalculatorInput {
  switch (action.type) {
    case "SET_PERIOD": {
      // Reset N1 partial e field evaluation quando muda período
      const newState = {
        ...state,
        period: action.payload,
        n1Partial: null,
      };
      // Só mantém fieldEvaluation no período 3-8
      if (action.payload === "1-2") {
        newState.fieldEvaluation = "none";
        newState.n2FieldScore = null;
      }
      return newState;
    }
    case "SET_FIELD_EVAL":
      return {
        ...state,
        fieldEvaluation: action.payload,
        n2FieldScore: action.payload === "none" ? null : state.n2FieldScore,
      };
    case "SET_N1_PARTIAL":
      return { ...state, n1Partial: action.payload };
    case "SET_N1_INSTITUTIONAL":
      return { ...state, n1Institutional: action.payload };
    case "SET_N2_PARTIAL":
      return { ...state, n2Partial: action.payload };
    case "SET_N2_INSTITUTIONAL":
      return { ...state, n2Institutional: action.payload };
    case "SET_N2_FIELD_SCORE":
      return { ...state, n2FieldScore: action.payload };
    case "SET_N3_FINAL":
      return { ...state, n3Final: action.payload };
    case "RESET":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export function useCalculator() {
  const [input, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const setPeriod = useCallback(
    (payload: CalculatorInput["period"]) =>
      dispatch({ type: "SET_PERIOD", payload }),
    []
  );

  const setFieldEvaluation = useCallback(
    (payload: CalculatorInput["fieldEvaluation"]) =>
      dispatch({ type: "SET_FIELD_EVAL", payload }),
    []
  );

  const setN1Partial = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N1_PARTIAL", payload }),
    []
  );

  const setN1Institutional = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N1_INSTITUTIONAL", payload }),
    []
  );

  const setN2Partial = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N2_PARTIAL", payload }),
    []
  );

  const setN2Institutional = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N2_INSTITUTIONAL", payload }),
    []
  );

  const setN2FieldScore = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N2_FIELD_SCORE", payload }),
    []
  );

  const setN3Final = useCallback(
    (payload: number | null) =>
      dispatch({ type: "SET_N3_FINAL", payload }),
    []
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const derived = useMemo<CalculatorDerived>(() => {
    const { period, fieldEvaluation } = input;

    // Calcular N1
    let n1: number | null = null;
    if (period === "1-2") {
      n1 =
        input.n1Partial !== null && input.n1Institutional !== null
          ? calcN1(input.n1Partial, input.n1Institutional)
          : null;
    } else {
      n1 =
        input.n1Institutional !== null
          ? getN1Simple(input.n1Institutional)
          : null;
    }

    // Calcular N2
    let n2: number | null = null;
    if (input.n2Partial !== null && input.n2Institutional !== null) {
      n2 = calcN2(input.n2Partial, input.n2Institutional);
      // Se tem field evaluation, soma ao N2
      if (fieldEvaluation === "with-field" && input.n2FieldScore !== null) {
        n2 = n2 + input.n2FieldScore;
      }
    }

    // Média Parcial
    const partialAverage =
      n1 !== null && n2 !== null ? calcPartialAverage(n1, n2) : null;

    // N3
    const n3Enabled = shouldEnableN3(partialAverage);
    let finalAverage: number | null = null;
    if (n3Enabled && input.n3Final !== null) {
      finalAverage = calcFinalAverage(partialAverage!, input.n3Final);
    }

    const status = resolveStatus(partialAverage, finalAverage);
    const requiredN3 =
      partialAverage !== null ? calcRequiredN3(partialAverage) : null;

    return {
      n1,
      n2,
      partialAverage,
      finalAverage,
      status,
      requiredN3,
      isN3Enabled: n3Enabled,
    };
  }, [
    input.period,
    input.fieldEvaluation,
    input.n1Partial,
    input.n1Institutional,
    input.n2Partial,
    input.n2Institutional,
    input.n2FieldScore,
    input.n3Final,
  ]);

  return {
    input,
    derived,
    setPeriod,
    setFieldEvaluation,
    setN1Partial,
    setN1Institutional,
    setN2Partial,
    setN2Institutional,
    setN2FieldScore,
    setN3Final,
    reset,
  };
}
