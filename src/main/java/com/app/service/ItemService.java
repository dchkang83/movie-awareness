package com.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.ItemMapper;
import com.app.models.ItemListRequestVO;
import com.app.models.ItemListSaveVO;
import com.app.models.ItemListVO;
import com.app.models.ItemVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ItemService {

  @Resource
  private ItemMapper itemMapper;

  public List<ItemListVO> getItemList(ItemListRequestVO itemListRequestVO) throws Exception {
    return itemMapper.getItemList(itemListRequestVO);
  }
  
//  public ItemVO getItem(String itemSrl) throws Exception {
//    return itemMapper.getItem(itemSrl);
//  }
  
  public int saveItem(ItemListSaveVO itemListSaveVO) throws Exception {
    
    int result = 0;
    
    List<ItemVO> insertList = new ArrayList<ItemVO>();
    
    for(ItemListVO itemListVO : itemListSaveVO.getItemList()) {
      
      if(itemListVO.getDbType().equals("I")) {
        insertList.add(itemListVO);
      }
      else if(itemListVO.getDbType().equals("U")) {
        itemListVO.setQuestionSrl(itemListSaveVO.getQuestionSrl());
        result += itemMapper.updateItem(itemListVO);
      }
      else if(itemListVO.getDbType().equals("D")) {
        result += itemMapper.deleteItem(itemListVO.getItemSrl());
      }
    }
    
    if(insertList.size() > 0) {
      Map<String, Object> mp = new HashMap<String, Object>();
      mp.put("questionSrl", itemListSaveVO.getQuestionSrl());
      mp.put("list", insertList);
      
      result += itemMapper.insertItemBatch(mp);
    }
    
    return result;
  }
}
