export interface SchoolProfile {
    city: string;
    name: string;
    npsn: string;
    email: string;
    phone: string;
    status: string;
    address: string;
    village: string;
    website: string | null;
    youtube: string | null;
    district: string;
    facebook: string | null;
    logo_url: string | null;
    province: string;
    instagram: string | null;
    postal_code: string;
    school_type: string;
    founded_year: number;
    principal_name: string;
}
  
export interface VisionMission {
    vision: string;
    missions: string[];
}

export interface SchoolResponse {
    success: boolean;
    data: {
        profile: SchoolProfile;
        vision_mission: VisionMission;
        history: Record<string, unknown>;
        org_chart: Record<string, unknown>;
    };
}