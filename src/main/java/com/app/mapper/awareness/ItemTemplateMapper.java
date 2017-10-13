package com.app.mapper.awareness;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.app.models.ItemTemplateListRequestVO;
import com.app.models.ItemTemplateListVO;
import com.app.models.ItemTemplateVO;

@Repository
public interface ItemTemplateMapper {
  
  public List<ItemTemplateListVO> getItemTemplateList(ItemTemplateListRequestVO itemTemplateListRequestVO);
  
  public int insertItemTemplateBatch(Map<String, Object> paramMap);
  
  public int updateItemTemplate(ItemTemplateVO itemTemplateVO);
  
  public int deleteItemTemplate(String itemSrl);


}
