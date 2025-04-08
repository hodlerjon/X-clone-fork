CREATE OR REPLACE FUNCTION create_tweet(
    p_user_id INTEGER,
    p_text_content TEXT,
    p_media_content TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS	
$$
BEGIN
    -- 280 belgidan oshmasligini tekshiramiz
    IF char_length(p_text_content) > 280 THEN
        RETURN FALSE;
	ELSE
	    -- tweetni joylaymiz
	    INSERT INTO tweets(user_id, text_content, media_content)
	    VALUES (p_user_id, p_text_content, p_media_content);
		RETURN TRUE;
    END IF;
	EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
