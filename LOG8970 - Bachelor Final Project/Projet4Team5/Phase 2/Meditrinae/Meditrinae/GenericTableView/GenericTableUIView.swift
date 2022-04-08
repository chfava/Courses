//
//  DiagnosticUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import iOSDropDown

protocol SelectedCellProtocol {
    func selectItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?)
    func deleteItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?)
}

class GenericTableUIView: UIView {
    
    var positionY: CGFloat!
    var positionX: CGFloat!
    var width: CGFloat!
    var height: CGFloat!
    var hasSearchBar: Bool!
    
    var items = [TableItem]()
    var searchResultItems = [TableItem]()
    let tableView = UITableView()
    var selectedCellSegueProtocol: SelectedCellProtocol!
    
    var isSearching: Bool = false
    
    lazy var searchBar: UISearchBar = {
        let bar = UISearchBar()
        bar.translatesAutoresizingMaskIntoConstraints = false
        
        return bar
    }()
    
    init(frame: CGRect, search: Bool) {
        super.init(frame: frame)
        self.hasSearchBar = search
        width = self.frame.width - 2 * BORDER_SIZE
        positionY = self.frame.origin.y + OUTTER_PADDING
        positionX = self.frame.origin.x + OUTTER_PADDING
        buildTableView()
     }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func buildTableView() {
        let safeArea = self.layoutMarginsGuide
        if (hasSearchBar) {
            self.addSubview(searchBar)
            searchBar.delegate = self
            searchBar.returnKeyType = UIReturnKeyType.done
            searchBar.topAnchor.constraint(equalTo: safeArea.topAnchor, constant: 5).isActive = true
            searchBar.leftAnchor.constraint(equalTo: safeArea.leftAnchor).isActive = true
            searchBar.heightAnchor.constraint(equalToConstant: 50 ).isActive = true
            searchBar.rightAnchor.constraint(equalTo: safeArea.rightAnchor).isActive = true
            
            self.addSubview(tableView)
            tableView.dataSource = self
            tableView.delegate = self
            
            tableView.translatesAutoresizingMaskIntoConstraints = false
            tableView.topAnchor.constraint(equalTo: searchBar.bottomAnchor, constant: 10).isActive = true
            tableView.leftAnchor.constraint(equalTo: safeArea.leftAnchor).isActive = true
            tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor).isActive = true
            tableView.rightAnchor.constraint(equalTo: safeArea.rightAnchor).isActive = true
            tableView.register(GenereicTableViewCell.self, forCellReuseIdentifier: "genereicTableViewCell")
            tableView.tableFooterView = UIView(frame: .zero)
        }
        else {
        
        self.addSubview(tableView)
        tableView.dataSource = self
        tableView.delegate = self
      
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.topAnchor.constraint(equalTo: safeArea.topAnchor, constant: 10).isActive = true
        tableView.leftAnchor.constraint(equalTo: safeArea.leftAnchor).isActive = true
        tableView.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor).isActive = true
        tableView.rightAnchor.constraint(equalTo: safeArea.rightAnchor).isActive = true
        tableView.register(GenereicTableViewCell.self, forCellReuseIdentifier: "genereicTableViewCell")
        tableView.tableFooterView = UIView(frame: .zero)
        }
    }
    
    func alphaOrder() {
        let sortedItems = items.sorted(by: {$0.user!.lastname < $1.user!.lastname})
        deleteAllItems()
        for item in sortedItems {
            addToTableView(item: item)
        }
        
    }
    
    func addToTableView(item: TableItem) {
        if (checkRestriction(item: item)) {
        }
        else {
            self.items.append(item)
            print(item)
            let indexPath = IndexPath(row: items.count - 1, section: 0)
            print(indexPath)
            tableView.beginUpdates()
            tableView.insertRows(at: [indexPath], with: .automatic)
            tableView.endUpdates()
        }
    }
    
    func deleteAllItems() {
        self.items = [TableItem]()
        tableView.reloadData()
    }
    
    func checkRestriction(item: TableItem)-> Bool {
        if (item.ID == "1") {
            items.removeAll()
            tableView.reloadData()
            self.items.append(item)
            let indexPath = IndexPath(row: items.count - 1, section: 0)
            tableView.beginUpdates()
            tableView.insertRows(at: [indexPath], with: .automatic)
            tableView.endUpdates()
            return true
        }
        return false
    }
}

extension GenericTableUIView: UITableViewDataSource, UITableViewDelegate {
        
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if isSearching {
            return searchResultItems.count
        } else {
            return items.count
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var item: TableItem!
        if (isSearching) {
            item = searchResultItems[indexPath.row]
        } else {
            item = items[indexPath.row]
        }
        let cell = tableView.dequeueReusableCell(withIdentifier: "genereicTableViewCell", for: indexPath) as! GenereicTableViewCell
        cell.setCell(item: item)
        return cell
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        true
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let item = items[indexPath.row]
        if (item.active) {
            if (item.user != nil) {
                selectedCellSegueProtocol.selectItem(objectID: item.ID, user: item.user!, questionnaire: nil, medicalExam: nil, note: nil, clinic: nil)
            }
            else if (item.questionnaire != nil) {
                selectedCellSegueProtocol.selectItem(objectID: item.ID, user: nil, questionnaire: item.questionnaire, medicalExam: nil, note: nil, clinic: nil)
            }
            else if (item.medicalExam != nil) {
                selectedCellSegueProtocol.selectItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: item.medicalExam, note: nil, clinic: nil)
            }
            else if (item.note != nil) {
                selectedCellSegueProtocol.selectItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: nil, note: item.note, clinic: nil)
            }
            else if (item.clinic != nil) {
                selectedCellSegueProtocol.selectItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: nil, note: nil, clinic: item.clinic)
            }
        }
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let item = items[indexPath.row]
            if (item.active) {
                if (item.user != nil) {
                    selectedCellSegueProtocol.deleteItem(objectID: item.ID, user: item.user!, questionnaire: nil, medicalExam: nil,note: nil, clinic: nil)
                }
                else if (item.questionnaire != nil) {
                    selectedCellSegueProtocol.deleteItem(objectID: item.ID, user: nil, questionnaire: item.questionnaire, medicalExam: nil, note: nil, clinic: nil)
                }
                else if (item.medicalExam != nil) {
                    selectedCellSegueProtocol.deleteItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: item.medicalExam, note: nil, clinic: nil)
                }
                else if (item.note != nil) {
                    selectedCellSegueProtocol.deleteItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: nil, note: item.note, clinic: nil)
                }
                else if (item.note != nil) {
                    selectedCellSegueProtocol.deleteItem(objectID: item.ID, user: nil, questionnaire: nil, medicalExam: nil, note: nil, clinic: item.clinic)
                }
                items.remove(at: indexPath.row)
                tableView.beginUpdates()
                tableView.deleteRows(at: [indexPath], with: .automatic)
                tableView.endUpdates()
            }
        }
    }
}

extension GenericTableUIView: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        if searchBar.text == nil || searchBar.text == "" {
            isSearching = false
            self.endEditing(true)
            tableView.reloadData()
        } else {
            isSearching = true
            searchResultItems = items.filter({($0.name.range( of: searchBar.text!, options: .caseInsensitive) != nil)})
            tableView.reloadData()
        }
    }
}


