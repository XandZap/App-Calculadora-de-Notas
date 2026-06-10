"use client";

import { useReducer, useMemo, useCallback, useState } from "react";
import type {
  CalculatorInput,
  CalculatorDerived,
  CalculatorHints,
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
import {
  calcN2Hint,
  calcN1Hint,
  calcN2PartialHint,
  calcN2InstitutionalHint,
} from "@/lib/calculator/hints";

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
      const newState = { ...state, period: action.payload, n1Partial: null };
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
    case "TOGGLE_N3":
      return { ...state };
    case "RESET":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export function useCalculator() {
  const [input, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);
  const [n3Expanded, setN3Expanded] = useState(false);

  const setPeriod = useCallback(
    (payload: CalculatorInput["period"]) => {
      dispatch({ type: "SET_PERIOD", payload });
      setN3Expanded(false);
    },
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

  const toggleN3 = useCallback(() => {
    setN3Expanded((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    setN3Expanded(false);
  }, []);

  const derived = useMemo<CalculatorDerived>(() => {
    const { period, fieldEvaluation } = input;

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

    let n2: number | null = null;
    if (input.n2Partial !== null && input.n2Institutional !== null) {
      n2 = calcN2(input.n2Partial, input.n2Institutional);
      if (fieldEvaluation === "with-field" && input.n2FieldScore !== null) {
        n2 = n2 + input.n2FieldScore;
      }
    }

    const partialAverage =
      n1 !== null && n2 !== null ? calcPartialAverage(n1, n2) : null;

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

  const hints = useMemo<CalculatorHints>(() => {
    const { period } = input;
    const n1Final = derived.n1;
    const n2Final = derived.n2;

    const h: CalculatorHints = {
      n2Block: null,
      n2Partial: null,
      n2Institutional: null,
      n1Partial: null,
      n1Institutional: null,
    };

    // Hint para bloco N2 (quando N1 está preenchido mas N2 ainda não)
    if (n1Final !== null && input.n2Partial === null && input.n2Institutional === null) {
      h.n2Block = calcN2Hint(n1Final);
    }

    // Hint para N2 Parcial (quando N1 + N2 Institucional preenchido)
    if (n1Final !== null && input.n2Partial === null && input.n2Institutional !== null) {
      const n2Needed = period === "1-2"
        ? calcN1Hint(n1Final)  // no 1-2, N1 também tem parcial
        : calcN2Hint(n1Final);
      const targetDirect = n2Needed.direct !== null ? n2Needed.direct : 0;
      const targetN3 = n2Needed.n3Access !== null ? n2Needed.n3Access : 0;
      h.n2Partial = calcN2PartialHint(
        targetDirect,
        input.n2Institutional
      );
    }

    // Hint para N2 Institucional (quando N1 + N2 Parcial preenchido)
    if (n1Final !== null && input.n2Partial !== null && input.n2Institutional === null) {
      const n2Needed = calcN2Hint(n1Final);
      const targetDirect = n2Needed.direct !== null ? n2Needed.direct : 0;
      const targetN3 = n2Needed.n3Access !== null ? n2Needed.n3Access : 0;
      h.n2Institutional = calcN2InstitutionalHint(
        targetDirect,
        input.n2Partial
      );
    }

    // Hint para N1 Parcial (período 1-2, quando Institucional preenchido)
    if (period === "1-2" && input.n1Partial === null && input.n1Institutional !== null) {
      if (n2Final !== null) {
        const n1Needed = calcN1Hint(n2Final);
        h.n1Partial = {
          direct: n1Needed.direct !== null ? Math.max(0, Math.min(10, 2 * n1Needed.direct - input.n1Institutional)) : null,
          n3Access: n1Needed.n3Access !== null ? Math.max(0, Math.min(10, 2 * n1Needed.n3Access - input.n1Institutional)) : null,
        };
      }
    }

    // Hint para N1 Institucional (período 1-2, quando Parcial preenchido)
    if (period === "1-2" && input.n1Partial !== null && input.n1Institutional === null) {
      if (n2Final !== null) {
        const n1Needed = calcN1Hint(n2Final);
        h.n1Institutional = {
          direct: n1Needed.direct !== null ? Math.max(0, Math.min(10, 2 * n1Needed.direct - input.n1Partial)) : null,
          n3Access: n1Needed.n3Access !== null ? Math.max(0, Math.min(10, 2 * n1Needed.n3Access - input.n1Partial)) : null,
        };
      }
    }

    return h;
  }, [input, derived.n1, derived.n2]);

  // Auto-expand N3 quando todas notas preenchidas e status é needs_n3
  const shouldAutoExpand =
    derived.isN3Enabled &&
    input.n1Institutional !== null &&
    input.n2Partial !== null &&
    input.n2Institutional !== null &&
    !n3Expanded;

  if (shouldAutoExpand) {
    setN3Expanded(true);
  }

  const isAllN2Filled = input.n2Partial !== null && input.n2Institutional !== null;
  const isAllN1Filled = input.period === "1-2"
    ? input.n1Partial !== null && input.n1Institutional !== null
    : input.n1Institutional !== null;

  return {
    input,
    derived,
    hints,
    n3Expanded,
    setPeriod,
    setFieldEvaluation,
    setN1Partial,
    setN1Institutional,
    setN2Partial,
    setN2Institutional,
    setN2FieldScore,
    setN3Final,
    toggleN3,
    reset,
    isAllN1Filled,
    isAllN2Filled,
  };
}
