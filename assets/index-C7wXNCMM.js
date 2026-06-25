import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';
import { v as veranda_mf_2_plugin__loadShare__react__loadShare__ } from './veranda_mf_2_plugin__loadShare__react__loadShare__-BxvQ6I45.js';

var withSelector = {exports: {}};

var withSelector_production = {};

var shim$2 = {exports: {}};

var useSyncExternalStoreShim_production = {};

/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = veranda_mf_2_plugin__loadShare__react__loadShare__;
function is$1(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1,
  useState = React$1.useState,
  useEffect$1 = React$1.useEffect,
  useLayoutEffect = React$1.useLayoutEffect,
  useDebugValue$1 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue$1(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore =
  void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;

{
  shim$2.exports = useSyncExternalStoreShim_production;
}

var shimExports = shim$2.exports;

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = veranda_mf_2_plugin__loadShare__react__loadShare__,
  shim = shimExports;
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useSyncExternalStore = shim.useSyncExternalStore,
  useRef = React.useRef,
  useEffect = React.useEffect,
  useMemo = React.useMemo,
  useDebugValue = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function (
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selector,
  isEqual
) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function () {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return (memoizedSelection = currentSelection);
          }
          return (memoizedSelection = nextSnapshot);
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return (memoizedSnapshot = nextSnapshot), currentSelection;
        memoizedSnapshot = nextSnapshot;
        return (memoizedSelection = nextSelection);
      }
      var hasMemo = false,
        memoizedSnapshot,
        memoizedSelection,
        maybeGetServerSnapshot =
          void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function () {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot
          ? void 0
          : function () {
              return memoizedSelector(maybeGetServerSnapshot());
            }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function () {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue(value);
  return value;
};

{
  withSelector.exports = withSelector_production;
}

var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /*@__PURE__*/getDefaultExportFromCjs(withSelectorExports);

const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

const isPromise = promise => typeof promise === 'object' && typeof promise.then === 'function';

const globalCache = [];

function shallowEqualArrays(arrA, arrB, equal = (a, b) => a === b) {
  if (arrA === arrB) return true;
  if (!arrA || !arrB) return false;
  const len = arrA.length;
  if (arrB.length !== len) return false;

  for (let i = 0; i < len; i++) if (!equal(arrA[i], arrB[i])) return false;

  return true;
}

function query(fn, keys = null, preload = false, config = {}) {
  // If no keys were given, the function is the key
  if (keys === null) keys = [fn];

  for (const entry of globalCache) {
    // Find a match
    if (shallowEqualArrays(keys, entry.keys, entry.equal)) {
      // If we're pre-loading and the element is present, just return
      if (preload) return undefined; // If an error occurred, throw

      if (Object.prototype.hasOwnProperty.call(entry, 'error')) throw entry.error; // If a response was successful, return

      if (Object.prototype.hasOwnProperty.call(entry, 'response')) {
        if (config.lifespan && config.lifespan > 0) {
          if (entry.timeout) clearTimeout(entry.timeout);
          entry.timeout = setTimeout(entry.remove, config.lifespan);
        }

        return entry.response;
      } // If the promise is still unresolved, throw


      if (!preload) throw entry.promise;
    }
  } // The request is new or has changed.


  const entry = {
    keys,
    equal: config.equal,
    remove: () => {
      const index = globalCache.indexOf(entry);
      if (index !== -1) globalCache.splice(index, 1);
    },
    promise: // Execute the promise
    (isPromise(fn) ? fn : fn(...keys) // When it resolves, store its value
    ).then(response => {
      entry.response = response; // Remove the entry in time if a lifespan was given

      if (config.lifespan && config.lifespan > 0) {
        entry.timeout = setTimeout(entry.remove, config.lifespan);
      }
    }) // Store caught errors, they will be thrown in the render-phase to bubble into an error-bound
    .catch(error => entry.error = error)
  }; // Register the entry

  globalCache.push(entry); // And throw the promise, this yields control back to React

  if (!preload) throw entry.promise;
  return undefined;
}

const suspend = (fn, keys, config) => query(fn, keys, false, config);

const preload = (fn, keys, config) => void query(fn, keys, true, config);

const clear = keys => {
  if (keys === undefined || keys.length === 0) globalCache.splice(0, globalCache.length);else {
    const entry = globalCache.find(entry => shallowEqualArrays(keys, entry.keys, entry.equal));
    if (entry) entry.remove();
  }
};

var scheduler = {exports: {}};

var scheduler_production = {};

/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports$1) {
	function push(heap, node) {
	  var index = heap.length;
	  heap.push(node);
	  a: for (; 0 < index; ) {
	    var parentIndex = (index - 1) >>> 1,
	      parent = heap[parentIndex];
	    if (0 < compare(parent, node))
	      (heap[parentIndex] = node), (heap[index] = parent), (index = parentIndex);
	    else break a;
	  }
	}
	function peek(heap) {
	  return 0 === heap.length ? null : heap[0];
	}
	function pop(heap) {
	  if (0 === heap.length) return null;
	  var first = heap[0],
	    last = heap.pop();
	  if (last !== first) {
	    heap[0] = last;
	    a: for (
	      var index = 0, length = heap.length, halfLength = length >>> 1;
	      index < halfLength;

	    ) {
	      var leftIndex = 2 * (index + 1) - 1,
	        left = heap[leftIndex],
	        rightIndex = leftIndex + 1,
	        right = heap[rightIndex];
	      if (0 > compare(left, last))
	        rightIndex < length && 0 > compare(right, left)
	          ? ((heap[index] = right),
	            (heap[rightIndex] = last),
	            (index = rightIndex))
	          : ((heap[index] = left),
	            (heap[leftIndex] = last),
	            (index = leftIndex));
	      else if (rightIndex < length && 0 > compare(right, last))
	        (heap[index] = right), (heap[rightIndex] = last), (index = rightIndex);
	      else break a;
	    }
	  }
	  return first;
	}
	function compare(a, b) {
	  var diff = a.sortIndex - b.sortIndex;
	  return 0 !== diff ? diff : a.id - b.id;
	}
	exports$1.unstable_now = void 0;
	if ("object" === typeof performance && "function" === typeof performance.now) {
	  var localPerformance = performance;
	  exports$1.unstable_now = function () {
	    return localPerformance.now();
	  };
	} else {
	  var localDate = Date,
	    initialTime = localDate.now();
	  exports$1.unstable_now = function () {
	    return localDate.now() - initialTime;
	  };
	}
	var taskQueue = [],
	  timerQueue = [],
	  taskIdCounter = 1,
	  currentTask = null,
	  currentPriorityLevel = 3,
	  isPerformingWork = false,
	  isHostCallbackScheduled = false,
	  isHostTimeoutScheduled = false,
	  needsPaint = false,
	  localSetTimeout = "function" === typeof setTimeout ? setTimeout : null,
	  localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null,
	  localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
	function advanceTimers(currentTime) {
	  for (var timer = peek(timerQueue); null !== timer; ) {
	    if (null === timer.callback) pop(timerQueue);
	    else if (timer.startTime <= currentTime)
	      pop(timerQueue),
	        (timer.sortIndex = timer.expirationTime),
	        push(taskQueue, timer);
	    else break;
	    timer = peek(timerQueue);
	  }
	}
	function handleTimeout(currentTime) {
	  isHostTimeoutScheduled = false;
	  advanceTimers(currentTime);
	  if (!isHostCallbackScheduled)
	    if (null !== peek(taskQueue))
	      (isHostCallbackScheduled = true),
	        isMessageLoopRunning ||
	          ((isMessageLoopRunning = true), schedulePerformWorkUntilDeadline());
	    else {
	      var firstTimer = peek(timerQueue);
	      null !== firstTimer &&
	        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
	    }
	}
	var isMessageLoopRunning = false,
	  taskTimeoutID = -1,
	  frameInterval = 5,
	  startTime = -1;
	function shouldYieldToHost() {
	  return needsPaint
	    ? true
	    : exports$1.unstable_now() - startTime < frameInterval
	      ? false
	      : true;
	}
	function performWorkUntilDeadline() {
	  needsPaint = false;
	  if (isMessageLoopRunning) {
	    var currentTime = exports$1.unstable_now();
	    startTime = currentTime;
	    var hasMoreWork = true;
	    try {
	      a: {
	        isHostCallbackScheduled = !1;
	        isHostTimeoutScheduled &&
	          ((isHostTimeoutScheduled = !1),
	          localClearTimeout(taskTimeoutID),
	          (taskTimeoutID = -1));
	        isPerformingWork = !0;
	        var previousPriorityLevel = currentPriorityLevel;
	        try {
	          b: {
	            advanceTimers(currentTime);
	            for (
	              currentTask = peek(taskQueue);
	              null !== currentTask &&
	              !(
	                currentTask.expirationTime > currentTime && shouldYieldToHost()
	              );

	            ) {
	              var callback = currentTask.callback;
	              if ("function" === typeof callback) {
	                currentTask.callback = null;
	                currentPriorityLevel = currentTask.priorityLevel;
	                var continuationCallback = callback(
	                  currentTask.expirationTime <= currentTime
	                );
	                currentTime = exports$1.unstable_now();
	                if ("function" === typeof continuationCallback) {
	                  currentTask.callback = continuationCallback;
	                  advanceTimers(currentTime);
	                  hasMoreWork = !0;
	                  break b;
	                }
	                currentTask === peek(taskQueue) && pop(taskQueue);
	                advanceTimers(currentTime);
	              } else pop(taskQueue);
	              currentTask = peek(taskQueue);
	            }
	            if (null !== currentTask) hasMoreWork = !0;
	            else {
	              var firstTimer = peek(timerQueue);
	              null !== firstTimer &&
	                requestHostTimeout(
	                  handleTimeout,
	                  firstTimer.startTime - currentTime
	                );
	              hasMoreWork = !1;
	            }
	          }
	          break a;
	        } finally {
	          (currentTask = null),
	            (currentPriorityLevel = previousPriorityLevel),
	            (isPerformingWork = !1);
	        }
	        hasMoreWork = void 0;
	      }
	    } finally {
	      hasMoreWork
	        ? schedulePerformWorkUntilDeadline()
	        : (isMessageLoopRunning = false);
	    }
	  }
	}
	var schedulePerformWorkUntilDeadline;
	if ("function" === typeof localSetImmediate)
	  schedulePerformWorkUntilDeadline = function () {
	    localSetImmediate(performWorkUntilDeadline);
	  };
	else if ("undefined" !== typeof MessageChannel) {
	  var channel = new MessageChannel(),
	    port = channel.port2;
	  channel.port1.onmessage = performWorkUntilDeadline;
	  schedulePerformWorkUntilDeadline = function () {
	    port.postMessage(null);
	  };
	} else
	  schedulePerformWorkUntilDeadline = function () {
	    localSetTimeout(performWorkUntilDeadline, 0);
	  };
	function requestHostTimeout(callback, ms) {
	  taskTimeoutID = localSetTimeout(function () {
	    callback(exports$1.unstable_now());
	  }, ms);
	}
	exports$1.unstable_IdlePriority = 5;
	exports$1.unstable_ImmediatePriority = 1;
	exports$1.unstable_LowPriority = 4;
	exports$1.unstable_NormalPriority = 3;
	exports$1.unstable_Profiling = null;
	exports$1.unstable_UserBlockingPriority = 2;
	exports$1.unstable_cancelCallback = function (task) {
	  task.callback = null;
	};
	exports$1.unstable_forceFrameRate = function (fps) {
	  0 > fps || 125 < fps
	    ? console.error(
	        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
	      )
	    : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);
	};
	exports$1.unstable_getCurrentPriorityLevel = function () {
	  return currentPriorityLevel;
	};
	exports$1.unstable_next = function (eventHandler) {
	  switch (currentPriorityLevel) {
	    case 1:
	    case 2:
	    case 3:
	      var priorityLevel = 3;
	      break;
	    default:
	      priorityLevel = currentPriorityLevel;
	  }
	  var previousPriorityLevel = currentPriorityLevel;
	  currentPriorityLevel = priorityLevel;
	  try {
	    return eventHandler();
	  } finally {
	    currentPriorityLevel = previousPriorityLevel;
	  }
	};
	exports$1.unstable_requestPaint = function () {
	  needsPaint = true;
	};
	exports$1.unstable_runWithPriority = function (priorityLevel, eventHandler) {
	  switch (priorityLevel) {
	    case 1:
	    case 2:
	    case 3:
	    case 4:
	    case 5:
	      break;
	    default:
	      priorityLevel = 3;
	  }
	  var previousPriorityLevel = currentPriorityLevel;
	  currentPriorityLevel = priorityLevel;
	  try {
	    return eventHandler();
	  } finally {
	    currentPriorityLevel = previousPriorityLevel;
	  }
	};
	exports$1.unstable_scheduleCallback = function (
	  priorityLevel,
	  callback,
	  options
	) {
	  var currentTime = exports$1.unstable_now();
	  "object" === typeof options && null !== options
	    ? ((options = options.delay),
	      (options =
	        "number" === typeof options && 0 < options
	          ? currentTime + options
	          : currentTime))
	    : (options = currentTime);
	  switch (priorityLevel) {
	    case 1:
	      var timeout = -1;
	      break;
	    case 2:
	      timeout = 250;
	      break;
	    case 5:
	      timeout = 1073741823;
	      break;
	    case 4:
	      timeout = 1e4;
	      break;
	    default:
	      timeout = 5e3;
	  }
	  timeout = options + timeout;
	  priorityLevel = {
	    id: taskIdCounter++,
	    callback: callback,
	    priorityLevel: priorityLevel,
	    startTime: options,
	    expirationTime: timeout,
	    sortIndex: -1
	  };
	  options > currentTime
	    ? ((priorityLevel.sortIndex = options),
	      push(timerQueue, priorityLevel),
	      null === peek(taskQueue) &&
	        priorityLevel === peek(timerQueue) &&
	        (isHostTimeoutScheduled
	          ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))
	          : (isHostTimeoutScheduled = true),
	        requestHostTimeout(handleTimeout, options - currentTime)))
	    : ((priorityLevel.sortIndex = timeout),
	      push(taskQueue, priorityLevel),
	      isHostCallbackScheduled ||
	        isPerformingWork ||
	        ((isHostCallbackScheduled = true),
	        isMessageLoopRunning ||
	          ((isMessageLoopRunning = true), schedulePerformWorkUntilDeadline())));
	  return priorityLevel;
	};
	exports$1.unstable_shouldYield = shouldYieldToHost;
	exports$1.unstable_wrapCallback = function (callback) {
	  var parentPriorityLevel = currentPriorityLevel;
	  return function () {
	    var previousPriorityLevel = currentPriorityLevel;
	    currentPriorityLevel = parentPriorityLevel;
	    try {
	      return callback.apply(this, arguments);
	    } finally {
	      currentPriorityLevel = previousPriorityLevel;
	    }
	  };
	}; 
} (scheduler_production));

{
  scheduler.exports = scheduler_production;
}

var schedulerExports = scheduler.exports;
const Tb = /*@__PURE__*/getDefaultExportFromCjs(schedulerExports);

export { Tb as T, suspend as a, clear as b, createStore as c, preload as p, schedulerExports as s, useSyncExternalStoreExports as u };
