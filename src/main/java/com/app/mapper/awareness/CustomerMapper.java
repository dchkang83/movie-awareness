package com.app.mapper.awareness;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.app.models.QuestionRequestVO;
import com.app.models.QuestionVO;
import com.app.models.ValidRequestVO;
import com.app.models.ValidResponseVO;
import com.app.models.AnswerRequestVO;
import com.app.models.AnswerResponseVO;

@Repository
public interface CustomerMapper {

  public List<QuestionVO> getQuestion(QuestionRequestVO params);
  public int valid(ValidRequestVO params);
  public int answer(AnswerRequestVO parmas);

}
