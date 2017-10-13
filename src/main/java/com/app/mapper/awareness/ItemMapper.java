package com.app.mapper.awareness;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.app.models.ItemListRequestVO;
import com.app.models.ItemListVO;
import com.app.models.ItemVO;

@Repository
public interface ItemMapper {
  
  public List<ItemListVO> getItemList(ItemListRequestVO itemListRequestVO);
  
//  public ItemVO getItem(String itemSrl);
  
  public int insertItemBatch(Map<String, Object> paramMap);
  
  public int updateItem(ItemVO itemVO);
  
  public int deleteItem(String itemSrl);
  
  public int insertItemDumy(Map<String, String> paramMap);
}
