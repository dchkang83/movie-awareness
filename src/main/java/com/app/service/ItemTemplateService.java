package com.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.ItemTemplateMapper;
import com.app.models.ItemTemplateListRequestVO;
import com.app.models.ItemTemplateListSaveVO;
import com.app.models.ItemTemplateListVO;
import com.app.models.ItemTemplateVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ItemTemplateService {

  @Resource
  private ItemTemplateMapper itemTemplateMapper;

  public List<ItemTemplateListVO> getItemTemplateList(ItemTemplateListRequestVO itemTemplateListRequestVO) throws Exception {
    return itemTemplateMapper.getItemTemplateList(itemTemplateListRequestVO);
  }
  
  public int saveItemTemplate(ItemTemplateListSaveVO itemTemplateListSaveVO) throws Exception {
    
    int result = 0;
    
    List<ItemTemplateVO> insertList = new ArrayList<ItemTemplateVO>();
    
    for(ItemTemplateListVO itemTemplateListVO : itemTemplateListSaveVO.getItemList()) {
      
      if(itemTemplateListVO.getDbType().equals("I")) {
        insertList.add(itemTemplateListVO);
      }
      else if(itemTemplateListVO.getDbType().equals("U")) {
        itemTemplateListVO.setQuestionSrl(itemTemplateListSaveVO.getQuestionSrl());
        result += itemTemplateMapper.updateItemTemplate(itemTemplateListVO);
      }
      else if(itemTemplateListVO.getDbType().equals("D")) {
        result += itemTemplateMapper.deleteItemTemplate(itemTemplateListVO.getItemSrl());
      }
    }
    
    if(insertList.size() > 0) {
      Map<String, Object> mp = new HashMap<String, Object>();
      mp.put("questionSrl", itemTemplateListSaveVO.getQuestionSrl());
      mp.put("list", insertList);
      
      result += itemTemplateMapper.insertItemTemplateBatch(mp);
    }
    
    return result;
  }
}
