export interface Incident {
	operation_id: number;
    operation_type: string;
    operation_name: string;
    county: string;
    activity_id: number;
    section_id: number;
    non_compliance_id: number;
    standard_number_description: string;
    standard_risk_level: string;
    corrected_at_inspection: boolean;
    corrected_date: string;
    date_correction_verified: string;
    narrative: string;
    technical_assistance_given: boolean;
    programs_provided: string;
    total_capacity: number;
    open_foster_homes: number;
    corrective_action: boolean;
    adverse_action: boolean; 
    temporarily_closed: boolean;
}

export interface ClassificationProbability {
    abuse: number;
    nonAbuse: number;
}

export interface IncidentWithClassification extends Incident {
    classification: ClassificationProbability;
}

export interface WhereClause {
    column: string;
    value: string | number;
    isEquals: boolean;
}

export interface TrainingLists {
    abuse: Array<Array<string>>;
    nonAbuse: Array<Array<string>>;
}

export interface TrainingOutput {
    good?: number;
    bad?: number;
}

export interface TrainingTest {
    input: Array<number>;
    output: TrainingOutput;
}

export interface Classifier {
    net: any;
    combinedTokens: Set<string>;
}
