-- Func to bypass and use rpc to exec sql
CREATE OR REPLACE FUNCTION execute_sql(query text)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    EXECUTE 'SELECT json_agg(row_to_json(t)) FROM (' || query || ') t' INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql;