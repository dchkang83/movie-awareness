/**
 *  문항 관리 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-24
 */
package com.app.controller.admin;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.controller.CommonRestController;
import com.app.common.models.ResponseListVO;
import com.app.models.ItemListRequestVO;
import com.app.models.ItemListSaveVO;
import com.app.models.ItemListVO;
import com.app.service.ItemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "ItemController", tags = "문항 관리")
@RequestMapping("/admin")
public class ItemController extends CommonRestController {
  
  @Resource
  private ItemService itemService;
  
  @ApiOperation(value = "문항 관리 - 리스트", notes = "문항 리스트")
  @GetMapping(path = "/items")
  public ResponseEntity<ResponseListVO> getItemListSearch(@Valid ItemListRequestVO itemListRequestVO) throws Exception {
    
    List<ItemListVO> list = itemService.getItemList(itemListRequestVO);
    
    ResponseListVO responseListVO = new ResponseListVO(0, 0, 0, list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "문항 관리 - 등록", notes = "문항 등록")
  @PostMapping(path = "/items", produces = {MediaType.APPLICATION_JSON_VALUE})
  public ResponseEntity saveItem(@RequestBody @Valid ItemListSaveVO itemListSaveVO) throws Exception {
    
    int result = itemService.saveItem(itemListSaveVO);
    
    return new ResponseEntity(result, HttpStatus.OK);
  }
}
