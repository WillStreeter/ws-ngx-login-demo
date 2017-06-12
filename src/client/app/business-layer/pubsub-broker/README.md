## PubSubBroker & Brokerage

#### An implementation of Publish and Subscribe

## Architecture:

### Object Oriented Break Down

Previously, Publish and Subscribe systems I have created, have been implemented  by either passing particular functions
representing Publish Acts and  Subscription Acts or I have created an event system of,broadcasting publication actions and
and consuming subscriptions with listeners. Using TypeScript and ReactiveX observables, I can take advantage of OOP concepts
like [Abstract, Implements, and Extends](https://www.typescriptlang.org/docs/handbook/classes.html) to create a cycle
between Subscribers (Consumers) and Publishers (Suppliers);


![Alt Text](https://github.com/WillStreeter/ws-ngx-login-demo/raw/master/ghassets/ClassOOPConstruction.png)


The **BrokerPublisher** is a Supplier to Brokerage Consumers. When the application is instantiated a **NGRXBrokerRegistrationService**
class is created registering the **NGRxBrokerConsumer** with the **BrokerPublisher**. The **NGRxBrokerConsumer** creates various
Broker Stubs that process request to the **data-layer** services. Request to get communication supplies in the forms of
actionable request and subscribable observables is are communicated to the **BrokerPublisher** by **BrokerDispatchService**
calls.



### PubSubBroker
A more indepth description of how this mechanism works can be found at [Optimal Angular : PubSub With NGRx](https://medium.com/@will.streeter/optimal-angular-pubsub-with-ngrx-4faab11eb293).
The goal of front-end web client service is to provide a bridge between a  **view-layer** and a **data-layer** allowing
the process in each be independent of any direct references to each other.  Thus, it is best if the services resides
in a separate layer such as a **business-layer**.  One of the most important aspects of any Publish and Subscribe
system is to ensure the directions of Publish request and  Subscribing to changes are unique.

Strictly enforcing these directions fo Publish and Subscribe (PubSub) helps prevent cluttering, sometimes called the spaghetti
effect of having Subscriptions capture Publishing request before the effect of the ultimate goal of the Publish
action has taken effect.

Adding the  use of  **'Observables"**, the basis of the [ReactiveX/JS](https://github.com/ReactiveX/rxjs) is a tremendous
aid, if not the perfect remedy to PubSub's complexity.

  + Observables are accessed through '.subscribe()' functions, essentially fulfilling the roll of Subscribe
     in the PubSub paradigm.

  + Observables do not need to be relegated to a specific type, but can stand  on their own, no direct reference to the
    classes creating an observables is needed


![Alt Text](https://github.com/WillStreeter/ws-ngx-login-demo/raw/master/ghassets/pubsub-observables.png)



In the diagram above, the **view-layer** consumes the data object **FOO** as an Observable without any reference to the
data class that created establish FOO is an Observable. When **FOO** has an action Published against it, the change to
**FOO** automatically triggers the Observerable.subscribe() function  allowing **view-layer** to review the changes
and implement any changes it deems necessary.




## TODO
 + **Build Test Case**
 + **Implement an instance in which  NGRx is not used**
 + **Remove Angular Injectable() so that it may stand without Angular**
 + **InCorporate Brokerage**