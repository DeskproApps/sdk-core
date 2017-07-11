import { TicketContext, tryAndCreate as TicketContextFactory } from './TicketContext';
import { registerRequestListeners as registerTicketRequestListeners } from './TicketEventHandlers';

import { PersonContext, tryAndCreate as PersonContextFactory } from './PersonContext';
import { OrganizationContext, tryAndCreate as OrganizationContextFactory } from './OrganizationContext';

import * as TicketEvents from './TicketEvents';
export { TicketEvents };

export const types = [
  TicketContext.TYPE,
  PersonContext.TYPE,
  OrganizationContext.TYPE
];

export const factories = [
  TicketContextFactory,
  PersonContextFactory,
  OrganizationContextFactory
];

/**
 * @param {EventEmitter} outgoingDispatcher
 * @param {EventEmitter} incomingDispatcher
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export const createContext = (outgoingDispatcher, incomingDispatcher, contextProps) =>
{
  const props = {outgoingDispatcher, incomingDispatcher, contextProps};
  for (const factory of factories) {
    let context = factory(props);
    if (context) { return context; }
  }

  throw new Error(`unknown context type ${contextProps.contextType}. Valid context types are: ${types.join(', ')}`);
};


