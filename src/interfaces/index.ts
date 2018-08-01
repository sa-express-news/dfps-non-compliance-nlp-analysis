export interface Incident {
    uniq_id: number;
	operation_id: number;
    operation_number: string;
    operation_type: string;
    operation_name: string;
    location_address: string;
    phone: string;
    county: string;
    website: string;
    email: string;
    programs_provided: string;
    type_of_issuance: string;
    issuance_date: string;
    open_foster_homes: number;
    open_branch_offices: number;
    corrective_action: boolean;
    adverse_action: boolean;
    temporarily_closed: boolean;
    num_deficiencies_cited: number;
    activity_date: string;
    standard_number_description: string;
    activity_type: string;
    standard_risk_level: string;
    corrected_at_inspection: boolean;
    corrected_date: string;
    date_correction_verified: string;
    technical_assistance_given: boolean;
    narrative: string;
}

export interface IncidentWithClassification extends Incident {
    classification: string;
}

export interface SqlQuery {
    query: string;
}

export interface ParsedArgumentsPayload {
    dataset: string;
    filename: string;
}

export interface ParsedArguments {
    payload: ParsedArgumentsPayload;
    isSuccessful: boolean;
}
