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

export interface IncidentWithClassification extends Incident {
    classification: string;
}
