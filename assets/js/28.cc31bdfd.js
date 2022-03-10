(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{449:function(t,e,s){"use strict";s.r(e);var a=s(13),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"fault-oblivious-stateful-workflow-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fault-oblivious-stateful-workflow-code"}},[t._v("#")]),t._v(" Fault-oblivious stateful workflow code")]),t._v(" "),s("h2",{attrs:{id:"overview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),s("p",[t._v("Cadence core abstraction is a "),s("strong",[t._v("fault-oblivious stateful "),s("Term",{attrs:{term:"workflow"}})],1),t._v(". The state of the "),s("Term",{attrs:{term:"workflow"}}),t._v(" code, including local variables and threads it creates, is immune to process and Cadence service failures.\nThis is a very powerful concept as it encapsulates state, processing threads, durable timers and "),s("Term",{attrs:{term:"event"}}),t._v(" handlers.")],1),t._v(" "),s("h2",{attrs:{id:"example"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),s("p",[t._v("Let's look at a use case. A customer signs up for an application with a trial period. After the period, if the customer has not cancelled, he should be charged once a month for the renewal. The customer has to be notified by email about the charges and should be able to cancel the subscription at any time.")]),t._v(" "),s("p",[t._v("The business logic of this use case is not very complicated and can be expressed in a few dozen lines of code. But any practical implementation has to ensure that the business process is fault tolerant and scalable. There are various ways to approach the design of such a system.")]),t._v(" "),s("p",[t._v("One approach is to center it around a database. An application process would periodically scan database tables for customers in specific states, execute necessary actions, and update the state to reflect that. While feasible, this approach has various drawbacks. The most obvious is that the state machine of the customer state quickly becomes extremely complicated. For example, charging a credit card or sending emails can fail due to a downstream system unavailability. The failed calls might need to be retried for a long time, ideally using an exponential retry policy. These calls should be throttled to not overload external systems. There should be support for poison pills to avoid blocking the whole process if a single customer record cannot be processed for whatever reason. The database-based approach also usually has performance problems. Databases are not efficient for scenarios that require constant polling for records in a specific state.")]),t._v(" "),s("p",[t._v("Another commonly employed approach is to use a timer service and queues. Any update is pushed to a queue and then a "),s("Term",{attrs:{term:"worker"}}),t._v(" that consumes from it updates a database and possibly pushes more messages in downstream queues. For operations that require scheduling, an external timer service can be used. This approach usually scales much better because a database is not constantly polled for changes. But it makes the programming model more complex and error prone as usually there is no transactional update between a queuing system and a database.")],1),t._v(" "),s("p",[t._v("With Cadence, the entire logic can be encapsulated in a simple durable function that directly implements the business logic. Because the function is stateful, the implementer doesn't need to employ any additional systems to ensure durability and fault tolerance.")]),t._v(" "),s("p",[t._v("Here is an example "),s("Term",{attrs:{term:"workflow"}}),t._v(" that implements the subscription management use case. It is in Java, but Go is also supported. The Python and .NET libraries are under active development.")],1),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// This SubscriptionWorkflow interface is an example of defining a workflow in Cadence")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SubscriptionWorkflow")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@WorkflowMethod")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("manageSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" customerId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SignalMethod")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cancelSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SignalMethod")]),t._v("    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateBillingPeriodChargeAmount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" billingPeriodChargeAmount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),t._v("    \n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryCustomerId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),t._v("        \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryBillingPeriodNumber")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),t._v("        \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryBillingPeriodChargeAmount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Workflow implementation is independent from interface. That way, application that start/signal/query workflows only need to know the interface")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SubscriptionWorkflowImpl")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SubscriptionWorkflow")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" billingPeriodNum"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" subscriptionCancelled"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Customer")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SubscriptionActivities")]),t._v(" activities "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Workflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("newActivityStub")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SubscriptionActivities")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// This manageSubscription function is an example of a workflow using Cadence")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("manageSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Customer")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Set the Workflow customer to class properties so that it can be used by other methods like Query/Signal")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("customer "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// sendWelcomeEmail is an activity in Cadence. It is implemented in user code and Cadence executes this activity on a worker node when needed.")]),t._v("\n        activities"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sendWelcomeEmail")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// for this example, there are a fixed number of periods in the subscription")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Cadence supports indefinitely running workflow but some advanced techniques are needed")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("billingPeriodNum "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPeriodsInSubcription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Workflow.await tells Cadence to pause the workflow at this stage (saving it's state to the database)")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Execution restarts when the billing period time has passed or the subscriptionCancelled event is received , whichever comes first")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Workflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("await")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getBillingPeriod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" subscriptionCancelled"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("subscriptionCancelled"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                activities"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sendCancellationEmailDuringActiveSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            \n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// chargeCustomerForBillingPeriod is another activity")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Cadence will automatically handle issues such as your billing service being unavailable at the time")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this activity is invoked")]),t._v("\n            activities"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chargeCustomerForBillingPeriod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" billingPeriodNum"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            billingPeriodNum"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("subscriptionCancelled"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            activities"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sendSubscriptionOverEmail")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        \n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the workflow is finished once this function returns")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cancelSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        subscriptionCancelled "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateBillingPeriodChargeAmount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" billingPeriodChargeAmount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setBillingPeriodCharge")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("billingPeriodChargeAmount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryCustomerId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getId")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryBillingPeriodNumber")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" billingPeriodNum"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("queryBillingPeriodChargeAmount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" customer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSubscription")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getBillingPeriodCharge")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("p",[t._v("Again, note that this code directly implements the business logic. If any of the invoked operations (aka "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(") takes a long time, the code is not going to change. It is okay to block on "),s("code",[t._v("chargeCustomerForBillingPeriod")]),t._v(" for a day if the downstream processing service is down that long. The same way that blocking sleep for a billing period like 30 days is a normal operation inside the "),s("Term",{attrs:{term:"workflow"}}),t._v(" code.")],1),t._v(" "),s("p",[t._v("Cadence has practically no scalability limits on the number of open "),s("Term",{attrs:{term:"workflow"}}),t._v(" instances. So even if your site has hundreds of millions of consumers, the above code is not going to change.")],1),t._v(" "),s("p",[t._v('The commonly asked question by developers that learn Cadence is "How do I handle '),s("Term",{attrs:{term:"workflow_worker"}}),t._v(" process failure/restart in my "),s("Term",{attrs:{term:"workflow"}}),t._v('"? The answer is that you do not. '),s("strong",[t._v("The "),s("Term",{attrs:{term:"workflow"}}),t._v(" code is completely oblivious to any failures and downtime of "),s("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" or even the Cadence service itself")],1),t._v(". As soon as they are recovered and the "),s("Term",{attrs:{term:"workflow"}}),t._v(" needs to handle some "),s("Term",{attrs:{term:"event"}}),t._v(", like timer or an "),s("Term",{attrs:{term:"activity"}}),t._v(" completion, the current state of the "),s("Term",{attrs:{term:"workflow"}}),t._v(" is fully restored and the execution is continued. The only reason for a "),s("Term",{attrs:{term:"workflow"}}),t._v(" failure is the "),s("Term",{attrs:{term:"workflow"}}),t._v(" business code throwing an exception, not underlying infrastructure outages.")],1),t._v(" "),s("p",[t._v("Another commonly asked question is whether a "),s("Term",{attrs:{term:"worker"}}),t._v(" can handle more "),s("Term",{attrs:{term:"workflow"}}),t._v(" instances than its cache size or number of threads it can support. The answer is that a "),s("Term",{attrs:{term:"workflow"}}),t._v(", when in a blocked state, can be safely removed from a "),s("Term",{attrs:{term:"worker"}}),t._v(".\nLater it can be resurrected on a different or the same "),s("Term",{attrs:{term:"worker"}}),t._v(" when the need (in the form of an external "),s("Term",{attrs:{term:"event"}}),t._v(") arises. So a single "),s("Term",{attrs:{term:"worker"}}),t._v(" can handle millions of open "),s("Term",{attrs:{term:"workflow_execution",show:"workflow_executions"}}),t._v(", assuming it can handle the update rate.")],1),t._v(" "),s("h2",{attrs:{id:"state-recovery-and-determinism"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#state-recovery-and-determinism"}},[t._v("#")]),t._v(" State Recovery and Determinism")]),t._v(" "),s("p",[t._v("The "),s("Term",{attrs:{term:"workflow"}}),t._v(" state recovery utilizes "),s("Term",{attrs:{term:"event"}}),t._v(" sourcing which puts a few restrictions on how the code is written. The main restriction is that the "),s("Term",{attrs:{term:"workflow"}}),t._v(" code must be deterministic which means that it must produce exactly the same result if executed multiple times. This rules out any external API calls from the "),s("Term",{attrs:{term:"workflow"}}),t._v(" code as external calls can fail intermittently or change its output any time. That is why all communication with the external world should happen through "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(". For the same reason, "),s("Term",{attrs:{term:"workflow"}}),t._v(" code must use Cadence APIs to get current time, sleep, and create new threads.")],1),t._v(" "),s("p",[t._v("To understand the Cadence execution model as well as the recovery mechanism, watch the following webcast. The animation covering recovery starts at 15:50.")]),t._v(" "),s("figure",{staticClass:"video-container"},[s("iframe",{attrs:{src:"https://www.youtube.com/embed/qce_AqCkFys?start=960",frameborder:"0",height:"315",allowfullscreen:"",width:"560"}})]),t._v(" "),s("h2",{attrs:{id:"id-uniqueness"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#id-uniqueness"}},[t._v("#")]),t._v(" ID Uniqueness")]),t._v(" "),s("p",[s("Term",{attrs:{term:"workflow_ID",show:"Workflow_ID"}}),t._v(" is assigned by a client when starting a "),s("Term",{attrs:{term:"workflow"}}),t._v(". It is usually a business level ID like customer ID or order ID.")],1),t._v(" "),s("p",[t._v("Cadence guarantees that there could be only one "),s("Term",{attrs:{term:"workflow"}}),t._v(" (across all "),s("Term",{attrs:{term:"workflow"}}),t._v(" types) with a given ID open per "),s("Term",{attrs:{term:"domain"}}),t._v(" at any time. An attempt to start a "),s("Term",{attrs:{term:"workflow"}}),t._v(" with the same ID is going to fail with "),s("code",[t._v("WorkflowExecutionAlreadyStarted")]),t._v(" error.")],1),t._v(" "),s("p",[t._v("An attempt to start a "),s("Term",{attrs:{term:"workflow"}}),t._v(" if there is a completed "),s("Term",{attrs:{term:"workflow"}}),t._v(" with the same ID depends on a "),s("code",[t._v("WorkflowIdReusePolicy")]),t._v(" option:")],1),t._v(" "),s("ul",[s("li",[s("code",[t._v("AllowDuplicateFailedOnly")]),t._v(" means that it is allowed to start a "),s("Term",{attrs:{term:"workflow"}}),t._v(" only if a previously executed "),s("Term",{attrs:{term:"workflow"}}),t._v(" with the same ID failed.")],1),t._v(" "),s("li",[s("code",[t._v("AllowDuplicate")]),t._v(" means that it is allowed to start independently of the previous "),s("Term",{attrs:{term:"workflow"}}),t._v(" completion status.")],1),t._v(" "),s("li",[s("code",[t._v("RejectDuplicate")]),t._v(" means that it is not allowed to start a "),s("Term",{attrs:{term:"workflow_execution"}}),t._v(" using the same "),s("Term",{attrs:{term:"workflow_ID"}}),t._v(" at all.")],1),t._v(" "),s("li",[s("code",[t._v("TerminateIfRunning")]),t._v(" means terminating the current running workflow if one exists, and start a new one.")])]),t._v(" "),s("p",[t._v("The default is "),s("code",[t._v("AllowDuplicateFailedOnly")]),t._v(".")]),t._v(" "),s("p",[t._v("To distinguish multiple runs of a "),s("Term",{attrs:{term:"workflow"}}),t._v(" with the same "),s("Term",{attrs:{term:"workflow_ID"}}),t._v(", Cadence identifies a "),s("Term",{attrs:{term:"workflow"}}),t._v(" with two IDs: "),s("code",[t._v("Workflow ID")]),t._v(" and "),s("code",[t._v("Run ID")]),t._v(". "),s("code",[t._v("Run ID")]),t._v(" is a service-assigned UUID. To be precise, any "),s("Term",{attrs:{term:"workflow"}}),t._v(" is uniquely identified by a triple: "),s("code",[t._v("Domain Name")]),t._v(", "),s("code",[t._v("Workflow ID")]),t._v(" and "),s("code",[t._v("Run ID")]),t._v(".")],1),t._v(" "),s("h2",{attrs:{id:"child-workflow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#child-workflow"}},[t._v("#")]),t._v(" Child Workflow")]),t._v(" "),s("p",[t._v("A "),s("Term",{attrs:{term:"workflow"}}),t._v(" can execute other "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" as "),s("code",[t._v("child :workflow:workflows:")]),t._v(". A child "),s("Term",{attrs:{term:"workflow"}}),t._v(" completion or failure is reported to its parent.")],1),t._v(" "),s("p",[t._v("Some reasons to use child "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" are:")],1),t._v(" "),s("ul",[s("li",[t._v("A child "),s("Term",{attrs:{term:"workflow"}}),t._v(" can be hosted by a separate set of "),s("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" which don't contain the parent "),s("Term",{attrs:{term:"workflow"}}),t._v(" code. So it would act as a separate service that can be invoked from multiple other "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(".")],1),t._v(" "),s("li",[t._v("A single "),s("Term",{attrs:{term:"workflow"}}),t._v(" has a limited size. For example, it cannot execute 100k "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(". Child "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" can be used to partition the problem into smaller chunks. One parent with 1000 children each executing 1000 "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" is 1 million executed "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(".")],1),t._v(" "),s("li",[t._v("A child "),s("Term",{attrs:{term:"workflow"}}),t._v(" can be used to manage some resource using its ID to guarantee uniqueness. For example, a "),s("Term",{attrs:{term:"workflow"}}),t._v(" that manages host upgrades can have a child "),s("Term",{attrs:{term:"workflow"}}),t._v(" per host (host name being a "),s("Term",{attrs:{term:"workflow_ID"}}),t._v(") and use them to ensure that all operations on the host are serialized.")],1),t._v(" "),s("li",[t._v("A child "),s("Term",{attrs:{term:"workflow"}}),t._v(" can be used to execute some periodic logic without blowing up the parent history size. When a parent starts a child, it executes periodic logic calling that continues as many times as needed, then completes. From the parent point if view, it is just a single child "),s("Term",{attrs:{term:"workflow"}}),t._v(" invocation.")],1)]),t._v(" "),s("p",[t._v("The main limitation of a child "),s("Term",{attrs:{term:"workflow"}}),t._v(" versus collocating all the application logic in a single "),s("Term",{attrs:{term:"workflow"}}),t._v(" is lack of the shared state. Parent and child can communicate only through asynchronous "),s("Term",{attrs:{term:"signal",show:"signals"}}),t._v(". But if there is a tight coupling between them, it might be simpler to use a single "),s("Term",{attrs:{term:"workflow"}}),t._v(" and just rely on a shared object state.")],1),t._v(" "),s("p",[t._v("We recommended starting from a single "),s("Term",{attrs:{term:"workflow"}}),t._v(" implementation if your problem has bounded size in terms of number of executed "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" and processed "),s("Term",{attrs:{term:"signal",show:"signals"}}),t._v(". It is more straightforward than multiple asynchronously communicating "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(".")],1),t._v(" "),s("h2",{attrs:{id:"workflow-retries"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#workflow-retries"}},[t._v("#")]),t._v(" Workflow Retries")]),t._v(" "),s("p",[s("Term",{attrs:{term:"workflow",show:"Workflow"}}),t._v(" code is unaffected by infrastructure level downtime and failures. But it still can fail due to business logic level failures. For example, an "),s("Term",{attrs:{term:"activity"}}),t._v(" can fail due to exceeding the retry interval and the error is not handled by application code, or the "),s("Term",{attrs:{term:"workflow"}}),t._v(" code having a bug.")],1),t._v(" "),s("p",[t._v("Some "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" require a guarantee that they keep running even in presence of such failures. To support such use cases, an optional exponential "),s("em",[t._v("retry policy")]),t._v(" can be specified when starting a "),s("Term",{attrs:{term:"workflow"}}),t._v(". When it is specified, a "),s("Term",{attrs:{term:"workflow"}}),t._v(" failure restarts a "),s("Term",{attrs:{term:"workflow"}}),t._v(" from the beginning after the calculated retry interval. Following are the retry policy parameters:")],1),t._v(" "),s("ul",[s("li",[s("code",[t._v("InitialInterval")]),t._v(" is a delay before the first retry.")]),t._v(" "),s("li",[s("code",[t._v("BackoffCoefficient")]),t._v(". Retry policies are exponential. The coefficient specifies how fast the retry interval is growing. The coefficient of 1 means that the retry interval is always equal to the "),s("code",[t._v("InitialInterval")]),t._v(".")]),t._v(" "),s("li",[s("code",[t._v("MaximumInterval")]),t._v(" specifies the maximum interval between retries. Useful for coefficients of more than 1.")]),t._v(" "),s("li",[s("code",[t._v("MaximumAttempts")]),t._v(" specifies how many times to attempt to execute a "),s("Term",{attrs:{term:"workflow"}}),t._v(" in the presence of failures. If this limit is exceeded, the "),s("Term",{attrs:{term:"workflow"}}),t._v(" fails without retry. Not required if "),s("code",[t._v("ExpirationInterval")]),t._v(" is specified.")],1),t._v(" "),s("li",[s("code",[t._v("ExpirationInterval")]),t._v(" specifies for how long to attempt executing a "),s("Term",{attrs:{term:"workflow"}}),t._v(" in the presence of failures. If this interval is exceeded, the "),s("Term",{attrs:{term:"workflow"}}),t._v(" fails without retry. Not required if "),s("code",[t._v("MaximumAttempts")]),t._v(" is specified.")],1),t._v(" "),s("li",[s("code",[t._v("NonRetryableErrorReasons")]),t._v(" allows to specify errors that shouldn't be retried. For example, retrying invalid arguments error doesn't make sense in some scenarios.")])]),t._v(" "),s("h2",{attrs:{id:"how-does-workflow-run"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#how-does-workflow-run"}},[t._v("#")]),t._v(" How does workflow run")]),t._v(" "),s("p",[t._v("You may wonder how it works. Behind the scenes, workflow decision is driving the whole workflow running. It's the internal entities for client and server to run your workflows. If this is interesting to you, read this "),s("a",{attrs:{href:"https://stackoverflow.com/questions/62904129/what-exactly-is-a-cadence-decision-task/63964726#63964726",target:"_blank",rel:"noopener noreferrer"}},[t._v("stack Overflow QA"),s("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);e.default=n.exports}}]);