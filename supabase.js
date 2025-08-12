const SUPABASE_URL = "https://dfomeijvzayyszisqflo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb21laWp2emF5eXN6aXNxZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NjYwNDIsImV4cCI6MjA2MDQ0MjA0Mn0.-r1iL04wvPNdBeIvgxqXLF2rWqIUX5Ot-qGQRdYo_qk";

let supabaseClient;

function initsupabase(){
  if (!supabaseClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabaseClient;
}

window.supabase=initsupabase();

document.addEventListener('DOMContentLoaded', function() {
  initsupabase();
  
  initialize();
});

async function getPlanAllOld() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('activities_plan')
      .select('*');
    
    if (error) {
      return [];
    }

    const formattedData = data.map(row => {
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    return formattedData;
  } catch (error) {
    return [];
  }
}

async function getPlanAll(date = null) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    let query = supabaseClient
      .from('activities_plan')
      .select('*');
    
    if (date) {
      const dateInt = parseInt(date);
      query = query.eq('날짜', dateInt);
    }
    
    const { data, error } = await query;
    
    if (error) {
      return [];
    }

    const formattedData = data.map(row => {
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    return formattedData;
  } catch (error) {
    return [];
  }
}

async function getJournalAllOld() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('activities_journal')
      .select('*');

    if (error) {
      return [];
    }

    const formattedData = data.map(row => {
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    return formattedData;
  } catch (error) {
    return [];
  }
}

async function getJournalAll(date = null) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    let query = supabaseClient
      .from('activities_journal')
      .select('*');
    
    if (date) {
      const dateInt = parseInt(date);
      query = query.eq('날짜', dateInt);
    }
    
    const { data, error } = await query;

    if (error) {
      return [];
    }

    const formattedData = data.map(row => {
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    return formattedData;
  } catch (error) {
    return [];
  }
}

async function getAllMembers() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('membersinfo')
      .select('회원번호, 회원명, 생년월일, 입소일, 퇴소일');

    if (error) {
      return [];
    }

    const formattedData = data.map(member => {
      return {
        ...member,
        생년월일: member.생년월일 ? member.생년월일.toString() : '',
        입소일: member.입소일 ? member.입소일.toString() : '',
        퇴소일: member.퇴소일 ? member.퇴소일.toString() : ''
      };
    });

    return formattedData;
  } catch (error) {
    return [];
  }
}

async function appendJournal(journalData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_journal')
      .insert([journalData]);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function appendPlan(planData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_plan')
      .insert([planData]);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function updateJournal(journalId, journalData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_journal')
      .update(journalData)
      .eq('일지_id', journalId);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function deleteJournalRow(journalId) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_journal')
      .delete()
      .eq('일지_id', journalId);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

function timeToNumber(timeString) {
  if (!timeString) return 0;
  
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function numberToTime(number) {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}