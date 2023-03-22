/**
 * @param bSuccess - при false выбрасывает ошибку с сообщением указанным во втором параметре
 * @param errorMessage - сообщение с описанием ошибки
 * @throws errorMessage
 */
export function assertSimple(
  bSuccess: boolean,
  errorMessage: string
): asserts bSuccess {
  if (!bSuccess) {
    try {
      throw new Error(errorMessage || "Unhandled exception");
    } finally {
      // Не останавливать поток во время тестов
      if (
        process.env.NODE_ENV !== "test" &&
        process.env.NODE_ENV !== "production"
      ) {
        debugger;
      }
    }
  }
}

/**
 * @param bSuccess - при false выбрасывает ошибку в консоль с сообщениями указанными в других параметрах
 * @param messages
 */
export function assertSilent(bSuccess: boolean, ...messages: string[]) {
  if (process.env.NODE_ENV !== "production") {
    if (!bSuccess) {
      const console = getConsole();
      const result = { ...messages } || ["Unhandled exception"];
      console.warn(result);
    }
  }
}

/**
 * @param assertionFunc - выполнение условий объявленных в теле assertionFunc только в develop режиме
 */
export function assertComplex(assertionFunc: () => void) {
  if (process.env.NODE_ENV !== "production") {
    assertionFunc();
  }
}

/**
 * Возвращает объект консоли
 */
function getConsole() {
  const console =
    typeof window.console !== "undefined"
      ? window.console
      : {
          log() {},
          error() {},
          warn() {},
        };

  console.log = console.log || function () {};

  console.error = console.error || function () {};

  console.warn = console.warn || function () {};

  return console;
}

/**
 * @param name - имя которое будет отображаться при логирование
 * @param object - объект, ключи которого будут проверены на соответствие снек кейсу
 */
export function assertNotSnakeCase(name: string, object: Record<string, any>) {
  if (process.env.NODE_ENV === "development") {
    Object.keys(object).forEach((key) => {
      if (!/^(?:[a-z]+_)*[a-z]+$/.test(key)) {
        // eslint-disable-next-line no-console
        console.error(`${key} it's not a snake case in ${name}`);
      }
    });
  }
}
