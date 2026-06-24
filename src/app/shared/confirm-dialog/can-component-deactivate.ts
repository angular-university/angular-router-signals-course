export interface CanComponentDeactivate {
    canDeactivate(): Promise<boolean>;
}
