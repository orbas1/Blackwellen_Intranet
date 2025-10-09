# Logic Flow Map — Version 1.50

```
[Login]
   |
   v
[Adaptive Home]
   |---> [Widget Personalisation Modal]
   |---> [AI Insight Drawer]
   |---> [Service Hub Shortcut]
                    |
                    v
           [Request Intake Wizard]
                    |
                    v
           [Workflow Engine]
                    |
                    v
          [Approver Dashboard]
                    |
                    +--> [Analytics Event Stream]

[Adaptive Home] ---> [Employee Directory]
                    |
                    v
         [Org Chart Explorer]
                    |
                    +--> [Export Service]

[Adaptive Home] ---> [Knowledge Hub]
                    |
                    v
         [Document Viewer]
                    |
                    v
           [Attestation Service]
                    |
                    +--> [Compliance Dashboard]

[Analytics Console]
    |
    v
[KPI Builder]
    |
    +--> [Telemetry Pipeline]
    |
    +--> [Widget Catalogue]
```

- Arrows represent primary navigation and data flow triggers.
- Telemetry pipeline nodes receive events for audits and analytics; feeds back to AI assistant for recommendations.
- Compliance dashboard monitors attestation completion, raising alerts to Service Hub for overdue policies.
